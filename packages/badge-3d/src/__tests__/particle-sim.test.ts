import { describe, expect, test } from "bun:test";
import { stepParticles, type SimParams, type SimState } from "../particle-sim";

function createTestSim(count: number): { state: SimState; params: SimParams } {
	const R = 0.012;
	const DIAM = R * 2;
	const gridW = 10;
	const gridH = 10;
	const maxPerCell = 20;

	const state: SimState = {
		px: new Float32Array(count),
		py: new Float32Array(count),
		ppx: new Float32Array(count),
		ppy: new Float32Array(count),
		grid: new Int32Array(gridW * gridH * maxPerCell),
		gridCnt: new Uint8Array(gridW * gridH),
	};

	for (let i = 0; i < count; i++) {
		state.px[i] = 0.5 + Math.random() * 0.1;
		state.py[i] = 0.5 + Math.random() * 0.1;
		state.ppx[i] = state.px[i];
		state.ppy[i] = state.py[i];
	}

	const params: SimParams = {
		count,
		R,
		DIAM,
		DIAM2: DIAM * DIAM,
		boundsMinX: 0,
		boundsMaxX: 1,
		boundsMinY: 0,
		boundsMaxY: 1,
		gridW,
		gridH,
		maxPerCell,
		cellSize: DIAM,
		gx: 0,
		gy: -0.5,
		angKick: 0,
		subDt2: 0.0001,
		cornerRadius: 0,
		hasFluid: false,
		fluidFlags: new Uint8Array(count),
	};

	return { state, params };
}

describe("stepParticles", () => {
	test("runs without crashing", () => {
		const { state, params } = createTestSim(100);
		expect(() => stepParticles(state, params, 4)).not.toThrow();
	});

	test("particles fall with gravity", () => {
		const { state, params } = createTestSim(10);
		const initialY = Array.from(state.py);

		stepParticles(state, params, 8);

		let moved = false;
		for (let i = 0; i < 10; i++) {
			if (state.py[i] !== initialY[i]) moved = true;
		}
		expect(moved).toBe(true);
	});

	test("particles stay within bounds", () => {
		const { state, params } = createTestSim(50);

		stepParticles(state, params, 16);

		const pad = 0.04;
		for (let i = 0; i < 50; i++) {
			expect(state.px[i]).toBeGreaterThanOrEqual(params.boundsMinX);
			expect(state.px[i]).toBeLessThanOrEqual(params.boundsMaxX);
			expect(state.py[i]).toBeGreaterThanOrEqual(params.boundsMinY);
			expect(state.py[i]).toBeLessThanOrEqual(params.boundsMaxY);
		}
	});

	test("handles zero particles", () => {
		const { state, params } = createTestSim(0);
		expect(() => stepParticles(state, params, 4)).not.toThrow();
	});

	test("handles fluid simulation", () => {
		const { state, params } = createTestSim(50);
		params.hasFluid = true;
		params.fluidFlags.fill(1);

		expect(() => stepParticles(state, params, 4)).not.toThrow();
	});
});
