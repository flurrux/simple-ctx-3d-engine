
export function normalize(from: number, to: number, value: number): number {
	return (value - from) / (to - from);
}
export function interpolate(from: number, to: number, value: number): number {
	return from + (to - from) * value
}

export const mapRange = (range1: [number, number], range2: [number, number], value: number): number => {
	const relVal = value - range1[0];
	const scale = (range2[1] - range2[0]) / (range1[1] - range1[0]);
	return range2[0] + relVal * scale;
};