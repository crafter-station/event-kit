"use client";
import { useEffect, useRef, useState } from "react";

export function AnimatedNumber({
	value,
	suffix = "",
	prefix = "",
	delay = 0,
}: {
	value: number;
	suffix?: string;
	prefix?: string;
	delay?: number;
}) {
	const [display, setDisplay] = useState(0);
	const ref = useRef<HTMLSpanElement>(null);

	useEffect(() => {
		const timeout = setTimeout(() => {
			const duration = 1200;
			const steps = 40;
			const increment = value / steps;
			let current = 0;
			const interval = setInterval(() => {
				current += increment;
				if (current >= value) {
					setDisplay(value);
					clearInterval(interval);
				} else {
					setDisplay(Math.floor(current));
				}
			}, duration / steps);
			return () => clearInterval(interval);
		}, delay);
		return () => clearTimeout(timeout);
	}, [value, delay]);

	return (
		<span ref={ref}>
			{prefix}
			{display.toLocaleString()}
			{suffix}
		</span>
	);
}
