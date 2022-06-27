import { range } from "fp-ts/es6/Array";

export const rangeFrom0 = (length: number): number[] => range(0, length - 1);

export const normalizedValues = (length: number, includeEnd: boolean = true): number[] => {
	const l = length + (includeEnd ? -1 : 0);
	return rangeFrom0(length).map(i => i / l);
};