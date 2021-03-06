import { range } from "fp-ts/es6/Array";
import { flow } from "fp-ts/es6/function";
import { Morphism, Vector3 } from "../lib/types";


export const sortByCamSpaceZ = <T>(
	getPosition: Morphism<T, Vector3>, 
	worldToCam: Morphism<Vector3, Vector3>) => (objects: T[]): T[] => {

	const zValues = objects.map(
		flow(
			getPosition, 
			worldToCam, 
			v => v[2]
		)
	);
	let sortedIndices = range(0, objects.length - 1);
	sortedIndices.sort(
		(i1, i2) => zValues[i2] - zValues[i1]
	);
	return sortedIndices.map(i => objects[i]);
};