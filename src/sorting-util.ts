import { range, sort } from "fp-ts/lib/Array";
import { flow, pipe } from "fp-ts/lib/function";
import { Morphism, Vector2, Vector3 } from "../lib/types";


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