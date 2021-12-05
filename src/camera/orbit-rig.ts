import { inverse, multiplyMatrix, rotation } from "../../lib/mat3x3";
import { Transform } from "../../lib/transform";
import { Matrix3, Vector3 } from "../../lib/types";
import { Camera } from "./camera";
import * as Vec3 from '../../lib/vec3';

export type OrbitParams = {
	radius: number,
	latitude: number,
	longitude: number,
};

function calculateOrientation(orbit: OrbitParams): Matrix3 {
	const rotationMatrix1 = rotation([0, orbit.longitude, 0]);
	const rotationMatrix2 = rotation([orbit.latitude, 0, 0]);
	return multiplyMatrix(rotationMatrix1, rotationMatrix2);
}

export function calculateTransform(orbit: OrbitParams): Transform {
	const orientation = calculateOrientation(orbit);
	const forward = orientation.slice(6) as Vector3;
	const position = Vec3.multiply(forward, -orbit.radius);
	return { position, orientation }
}

