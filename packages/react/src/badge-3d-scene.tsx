"use client";

import type { ParticleConfig } from "@crafter/event-kit-badge-3d";
import { defaultParticleConfig, stepParticles } from "@crafter/event-kit-badge-3d";
import type { SimState } from "@crafter/event-kit-badge-3d";
import { Environment, Lightformer, useGLTF, useTexture } from "@react-three/drei";
import { Canvas, extend, useFrame, useThree } from "@react-three/fiber";
import {
	BallCollider,
	CuboidCollider,
	Physics,
	RigidBody,
	useRopeJoint,
	useSphericalJoint,
} from "@react-three/rapier";
import { MeshLineGeometry, MeshLineMaterial } from "meshline";
import { useEffect, useMemo, useRef, useState } from "react";
import * as THREE from "three";

extend({ MeshLineGeometry, MeshLineMaterial });

export interface Badge3DSceneProps {
	cardTextureUrl?: string;
	particleConfig?: ParticleConfig;
	className?: string;
	style?: React.CSSProperties;
}

interface CardBounds {
	minX: number;
	maxX: number;
	minY: number;
	maxY: number;
	frontZ: number;
	cornerRadius: number;
}

function CameraRig({ isMobile }: { isMobile: boolean }) {
	const { camera } = useThree();
	useEffect(() => {
		if (isMobile) {
			camera.position.set(1.45, -0.5, 8.5);
			(camera as THREE.PerspectiveCamera).fov = 34;
		} else {
			camera.position.set(0, 0, 7);
			(camera as THREE.PerspectiveCamera).fov = 38;
		}
		(camera as THREE.PerspectiveCamera).updateProjectionMatrix();
	}, [isMobile, camera]);
	return null;
}

function ParticleGeometry({ shape }: { shape: string }) {
	switch (shape) {
		case "cube":
			return <boxGeometry args={[1.4, 1.4, 1.4]} />;
		case "diamond":
			return <octahedronGeometry args={[1.2]} />;
		case "capsule":
			return <capsuleGeometry args={[0.7, 0.6, 4, 8]} />;
		default:
			return <sphereGeometry args={[1, 8, 6]} />;
	}
}

function BadgeParticles({
	cardRef,
	isMobile,
	bounds,
	config,
}: {
	// biome-ignore lint/suspicious/noExplicitAny: R3F/Rapier rigid body refs lack exported types
	cardRef: React.MutableRefObject<any>;
	isMobile: boolean;
	bounds: CardBounds;
	config: ParticleConfig;
}) {
	const groupLayout = useMemo(() => {
		let offset = 0;
		const ranges = config.groups.map((g) => {
			const start = offset;
			offset += g.count;
			return { start, count: g.count };
		});
		return { ranges, total: offset };
	}, [config]);

	const count = groupLayout.total;

	const { fluidFlags, hasFluid } = useMemo(() => {
		const flags = new Uint8Array(count);
		let any = false;
		for (let g = 0; g < config.groups.length; g++) {
			if (config.groups[g].fluid) {
				any = true;
				const { start, count: gCount } = groupLayout.ranges[g];
				for (let i = start; i < start + gCount; i++) {
					flags[i] = 1;
				}
			}
		}
		return { fluidFlags: flags, hasFluid: any };
	}, [config, groupLayout, count]);

	const maxSize = useMemo(() => Math.max(...config.groups.map((g) => g.size)), [config]);
	const R = maxSize;
	const DIAM = R * 2;
	const DIAM2 = DIAM * DIAM;
	const cellSize = DIAM;
	const gridW = Math.ceil((bounds.maxX - bounds.minX) / cellSize) + 2;
	const gridH = Math.ceil((bounds.maxY - bounds.minY) / cellSize) + 2;
	const MAX_PER_CELL = 20;

	const sim = useRef<
		| (SimState & {
				prevCardVel: THREE.Vector3;
				smoothedAccel: THREE.Vector3;
				smoothedAngKick: number;
		  })
		| null
	>(null);

	if (!sim.current) {
		const px = new Float32Array(count);
		const py = new Float32Array(count);
		const ppx = new Float32Array(count);
		const ppy = new Float32Array(count);
		const h = bounds.maxY - bounds.minY;
		const fillH = h * 0.25;
		for (let i = 0; i < count; i++) {
			const x = bounds.minX + R + 0.04 + Math.random() * (bounds.maxX - bounds.minX - R * 2 - 0.08);
			const y = bounds.minY + R + 0.04 + Math.random() * fillH;
			px[i] = x;
			py[i] = y;
			ppx[i] = x;
			ppy[i] = y;
		}
		sim.current = {
			px,
			py,
			ppx,
			ppy,
			prevCardVel: new THREE.Vector3(),
			smoothedAccel: new THREE.Vector3(),
			smoothedAngKick: 0,
			grid: new Int32Array(gridW * gridH * MAX_PER_CELL),
			gridCnt: new Uint8Array(gridW * gridH),
		};
	}

	const meshRefs = useRef<(THREE.InstancedMesh | null)[]>([]);
	const tmp = useRef({
		mat: new THREE.Matrix4(),
		v: new THREE.Vector3(),
		q: new THREE.Quaternion(),
		iq: new THREE.Quaternion(),
		g: new THREE.Vector3(),
		a: new THREE.Vector3(),
		cv: new THREE.Vector3(),
	});

	useFrame((_, delta) => {
		const body = cardRef.current;
		const s = sim.current;
		const t = tmp.current;
		if (!body || !s) return;

		const dt = Math.min(delta, 0.033);
		const SUBSTEPS = isMobile ? 4 : 8;
		const subDt = dt / SUBSTEPS;

		const r = body.rotation();
		t.q.set(r.x, r.y, r.z, r.w);
		t.iq.copy(t.q).invert();

		const lv = body.linvel();
		t.cv.set(lv.x, lv.y, lv.z);
		const linSpeed = t.cv.length();

		t.a.copy(t.cv).sub(s.prevCardVel).divideScalar(dt).clampLength(0, 200);
		t.a.multiplyScalar(2.5);
		s.prevCardVel.copy(t.cv);
		if (linSpeed < 0.05) t.a.set(0, 0, 0);
		s.smoothedAccel.lerp(t.a, 0.15);

		const av = body.angvel();
		const angMag = Math.sqrt(av.x * av.x + av.y * av.y + av.z * av.z);
		const rawAngKick = angMag < 0.01 ? 0 : angMag * 15;
		s.smoothedAngKick += (rawAngKick - s.smoothedAngKick) * 0.15;

		t.g.set(0, -40, 0).sub(s.smoothedAccel).applyQuaternion(t.iq);

		stepParticles(
			s,
			{
				count,
				R,
				DIAM,
				DIAM2,
				boundsMinX: bounds.minX,
				boundsMaxX: bounds.maxX,
				boundsMinY: bounds.minY,
				boundsMaxY: bounds.maxY,
				gridW,
				gridH,
				maxPerCell: MAX_PER_CELL,
				cellSize,
				gx: t.g.x,
				gy: t.g.y,
				angKick: s.smoothedAngKick,
				subDt2: subDt * subDt,
				cornerRadius: bounds.cornerRadius,
				hasFluid,
				fluidFlags,
			},
			SUBSTEPS,
		);

		const { px, py } = s;
		const { ranges } = groupLayout;
		for (let g = 0; g < ranges.length; g++) {
			const mesh = meshRefs.current[g];
			if (!mesh) continue;
			const { start, count: gCount } = ranges[g];
			const groupSize = config.groups[g].size;
			for (let li = 0; li < gCount; li++) {
				const gi = start + li;
				t.mat.makeTranslation(px[gi], py[gi], bounds.frontZ + 0.01);
				t.v.set(groupSize, groupSize, groupSize * 0.4);
				t.mat.scale(t.v);
				mesh.setMatrixAt(li, t.mat);
			}
			mesh.instanceMatrix.needsUpdate = true;
		}
	});

	return (
		<>
			{config.groups.map((group, i) => {
				const isTransparent = group.opacity < 1 || group.transmission > 0;
				return (
					<instancedMesh
						key={`${group.color}-${group.shape}-${i}`}
						ref={(el) => {
							meshRefs.current[i] = el;
						}}
						args={[undefined, undefined, groupLayout.ranges[i].count]}
						frustumCulled={false}
					>
						<ParticleGeometry shape={group.shape} />
						<meshPhysicalMaterial
							color={group.color}
							roughness={group.roughness}
							metalness={group.metalness}
							clearcoat={isMobile ? 0 : group.clearcoat}
							clearcoatRoughness={0.2}
							emissive={group.emissive}
							emissiveIntensity={group.emissiveIntensity}
							transparent={isTransparent}
							opacity={group.opacity}
							transmission={group.transmission}
							thickness={group.transmission > 0 ? 0.5 : 0}
							ior={1.5}
						/>
					</instancedMesh>
				);
			})}
		</>
	);
}

function Band({
	maxSpeed = 50,
	minSpeed = 10,
	isMobile = false,
	cardTextureUrl,
	particleConfig,
	configKey,
}: {
	maxSpeed?: number;
	minSpeed?: number;
	isMobile?: boolean;
	cardTextureUrl?: string;
	particleConfig: ParticleConfig;
	configKey: string;
}) {
	// biome-ignore lint/suspicious/noExplicitAny: Rapier RigidBody refs don't export usable types
	const band = useRef<any>(null);
	// biome-ignore lint/suspicious/noExplicitAny: Rapier RigidBody refs
	const fixed = useRef<any>(null);
	// biome-ignore lint/suspicious/noExplicitAny: Rapier RigidBody refs
	const j1 = useRef<any>(null);
	// biome-ignore lint/suspicious/noExplicitAny: Rapier RigidBody refs
	const j2 = useRef<any>(null);
	// biome-ignore lint/suspicious/noExplicitAny: Rapier RigidBody refs
	const j3 = useRef<any>(null);
	// biome-ignore lint/suspicious/noExplicitAny: Rapier RigidBody refs
	const card = useRef<any>(null);

	const vec = new THREE.Vector3();
	const ang = new THREE.Vector3();
	const rot = new THREE.Vector3();
	const dir = new THREE.Vector3();

	// biome-ignore lint/suspicious/noExplicitAny: RigidBody spread props lack a single exported type
	const segmentProps: any = {
		type: "dynamic",
		canSleep: true,
		colliders: false,
		angularDamping: 2,
		linearDamping: 2,
	};

	// biome-ignore lint/suspicious/noExplicitAny: GLTF node/material types are model-specific
	const { nodes, materials } = useGLTF("/badge/id-card.glb") as any;
	const texture = useTexture("/badge/lanyard_ss.jpg") as THREE.Texture;

	const cardBounds = useMemo(() => {
		const geo = nodes.card.geometry as THREE.BufferGeometry;
		geo.computeBoundingBox();
		const bb = geo.boundingBox ?? new THREE.Box3();
		const scale = 2.25;
		const oY = -1.2;
		const oZ = -0.05;
		const w = (bb.max.x - bb.min.x) * scale;
		return {
			minX: bb.min.x * scale,
			maxX: bb.max.x * scale,
			minY: bb.min.y * scale + oY,
			maxY: bb.max.y * scale + oY,
			frontZ: bb.max.z * scale + oZ,
			cornerRadius: w * 0.06,
		};
	}, [nodes]);

	const [customCardTexture, setCustomCardTexture] = useState<THREE.Texture | null>(null);

	useEffect(() => {
		if (!cardTextureUrl) {
			setCustomCardTexture(null);
			return;
		}
		const loader = new THREE.TextureLoader();
		loader.load(cardTextureUrl, (loadedTexture) => {
			loadedTexture.flipY = false;
			loadedTexture.colorSpace = THREE.SRGBColorSpace;
			setCustomCardTexture(loadedTexture);
		});
	}, [cardTextureUrl]);

	const [curve] = useState(
		() =>
			new THREE.CatmullRomCurve3([
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
				new THREE.Vector3(),
			]),
	);
	const [dragged, drag] = useState<false | THREE.Vector3>(false);
	const [hovered, hover] = useState(false);

	const prevConfigKey = useRef(configKey);
	useEffect(() => {
		if (prevConfigKey.current === configKey) return;
		prevConfigKey.current = configKey;
		const body = card.current;
		if (!body) return;
		for (const ref of [card, j1, j2, j3, fixed]) ref.current?.wakeUp();
		body.applyImpulse({ x: 0, y: 3, z: 0 }, true);
	}, [configKey]);

	useRopeJoint(fixed, j1, [[0, 0, 0], [0, 0, 0], 1]);
	useRopeJoint(j1, j2, [[0, 0, 0], [0, 0, 0], 1]);
	useRopeJoint(j2, j3, [[0, 0, 0], [0, 0, 0], 1]);
	useSphericalJoint(j3, card, [
		[0, 0, 0],
		[0, 1.45, 0],
	]);

	useEffect(() => {
		if (hovered) {
			document.body.style.cursor = dragged ? "grabbing" : "grab";
			return () => {
				document.body.style.cursor = "auto";
			};
		}
	}, [hovered, dragged]);

	useFrame((state, delta) => {
		if (dragged && typeof dragged !== "boolean") {
			vec.set(state.pointer.x, state.pointer.y, 0.5).unproject(state.camera);
			dir.copy(vec).sub(state.camera.position).normalize();
			vec.add(dir.multiplyScalar(state.camera.position.length()));
			for (const ref of [card, j1, j2, j3, fixed]) ref.current?.wakeUp();
			card.current?.setNextKinematicTranslation({
				x: vec.x - dragged.x,
				y: vec.y - dragged.y,
				z: vec.z - dragged.z,
			});
		}
		if (fixed.current) {
			for (const ref of [j1, j2]) {
				if (!ref.current.lerped)
					ref.current.lerped = new THREE.Vector3().copy(ref.current.translation());
				const clampedDistance = Math.max(
					0.1,
					Math.min(1, ref.current.lerped.distanceTo(ref.current.translation())),
				);
				ref.current.lerped.lerp(
					ref.current.translation(),
					delta * (minSpeed + clampedDistance * (maxSpeed - minSpeed)),
				);
			}
			curve.points[0].copy(j3.current.translation());
			curve.points[1].copy(j2.current.lerped);
			curve.points[2].copy(j1.current.lerped);
			curve.points[3].copy(fixed.current.translation());
			band.current.geometry.setPoints(curve.getPoints(isMobile ? 16 : 32));
			ang.copy(card.current.angvel());
			rot.copy(card.current.rotation());
			card.current.setAngvel({
				x: ang.x,
				y: ang.y - rot.y * 0.25,
				z: ang.z,
			});
		}
	});

	curve.curveType = "chordal";
	texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

	return (
		<>
			<group position={[1.5, 4.5, 0]}>
				<RigidBody ref={fixed} {...segmentProps} type="fixed" />
				<RigidBody position={[0.5, 0, 0]} ref={j1} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody position={[1, 0, 0]} ref={j2} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody position={[1.5, 0, 0]} ref={j3} {...segmentProps}>
					<BallCollider args={[0.1]} />
				</RigidBody>
				<RigidBody
					position={[2, 0, 0]}
					ref={card}
					{...segmentProps}
					type={dragged ? "kinematicPosition" : "dynamic"}
				>
					<CuboidCollider args={[0.8, 1.125, 0.01]} />
					<BadgeParticles
						key={configKey}
						cardRef={card}
						isMobile={isMobile}
						bounds={cardBounds}
						config={particleConfig}
					/>
					<group
						scale={2.25}
						position={[0, -1.2, -0.05]}
						onPointerOver={() => hover(true)}
						onPointerOut={() => hover(false)}
						onPointerUp={(e) => {
							(e.target as Element).releasePointerCapture(e.pointerId);
							drag(false);
						}}
						onPointerDown={(e) => {
							(e.target as Element).setPointerCapture(e.pointerId);
							drag(new THREE.Vector3().copy(e.point).sub(vec.copy(card.current.translation())));
						}}
					>
						<mesh geometry={nodes.card.geometry}>
							<meshPhysicalMaterial
								map={
									cardTextureUrl && customCardTexture
										? customCardTexture
										: (materials["base.001"]?.map ?? materials.base?.map)
								}
								map-anisotropy={16}
								clearcoat={isMobile ? 0 : 1}
								clearcoatRoughness={0.15}
								roughness={0.3}
								metalness={0.5}
							/>
						</mesh>
						<mesh
							geometry={nodes.clip.geometry}
							material={materials.metal}
							material-roughness={0.3}
						/>
						<mesh geometry={nodes.clamp.geometry} material={materials.metal} />
					</group>
				</RigidBody>
			</group>
			<mesh ref={band}>
				{/* @ts-ignore */}
				<meshLineGeometry />
				{/* @ts-ignore */}
				<meshLineMaterial
					color="white"
					depthTest={false}
					resolution={[2000, 1000]}
					useMap
					map={texture}
					repeat={[-3, 1]}
					lineWidth={1}
				/>
			</mesh>
		</>
	);
}

export function Badge3DScene({
	cardTextureUrl,
	particleConfig = defaultParticleConfig,
	className,
	style,
}: Badge3DSceneProps) {
	const [isMobile, setIsMobile] = useState<boolean>(
		() => typeof window !== "undefined" && window.innerWidth < 768,
	);

	useEffect(() => {
		const handleResize = (): void => setIsMobile(window.innerWidth < 768);
		window.addEventListener("resize", handleResize);
		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const configKey = useMemo(() => JSON.stringify(particleConfig), [particleConfig]);

	return (
		<div className={className} style={{ touchAction: "none", ...style }}>
			<Canvas
				camera={{ position: [0, 0, 7], fov: 38 }}
				dpr={[1, isMobile ? 1.5 : 2]}
				gl={{ alpha: true, preserveDrawingBuffer: true }}
				onCreated={({ gl }) => gl.setClearColor(new THREE.Color(0x000000), 0)}
			>
				<CameraRig isMobile={isMobile} />
				<ambientLight intensity={Math.PI} />
				<Physics gravity={[0, -40, 0]} timeStep={1 / 60} interpolate>
					<Band
						isMobile={isMobile}
						cardTextureUrl={cardTextureUrl}
						particleConfig={particleConfig}
						configKey={configKey}
					/>
				</Physics>
				<Environment blur={0.75}>
					<Lightformer
						intensity={2}
						color="white"
						position={[0, -1, 5]}
						rotation={[0, 0, Math.PI / 3]}
						scale={[100, 0.1, 1]}
					/>
					<Lightformer
						intensity={3}
						color="white"
						position={[-1, -1, 1]}
						rotation={[0, 0, Math.PI / 3]}
						scale={[100, 0.1, 1]}
					/>
					<Lightformer
						intensity={3}
						color="white"
						position={[1, 1, 1]}
						rotation={[0, 0, Math.PI / 3]}
						scale={[100, 0.1, 1]}
					/>
					<Lightformer
						intensity={10}
						color="white"
						position={[-10, 0, 14]}
						rotation={[0, Math.PI / 2, Math.PI / 3]}
						scale={[100, 10, 1]}
					/>
				</Environment>
			</Canvas>
		</div>
	);
}
