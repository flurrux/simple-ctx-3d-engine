import { identity, inverse as inverseMatrix, multiplyMatrix, multiplyVector } from './mat3x3';
import { Matrix3, Vector3 } from './types';
import * as Vec3 from './vec3';

export interface Transform {
    position: Vector3,
    orientation: Matrix3
};

export const identityTransform: Transform = {
	position: [0, 0, 0],
	orientation: identity
};

export const transformPoint = (transform: Transform) => {
    return (point: Vector3) : Vector3 => {
		return Vec3.add(transform.position, multiplyVector(transform.orientation, point));
	}
};
export const transformDirection = (transform: Transform) => {
	return (direction: Vector3): Vector3 => {
		return multiplyVector(transform.orientation, direction);
	};
};
export const inverseTransformPoint = (position: Vector3, inverseOrientation: Matrix3) => (point: Vector3): Vector3 => multiplyVector(
	inverseOrientation, 
	Vec3.subtract(point, position)
);

export const inverseTransformDirection = (transform: Transform) => {
	const invMat = inverseMatrix(transform.orientation);
	return (direction: Vector3): Vector3 => multiplyVector(invMat, direction);
};
export const transformTransform = (transform: Transform) => {
    return (toTransform: Transform) => {
        const pointTransform = transformPoint(transform);
        return {
            position: pointTransform(toTransform.position),
            orientation: multiplyMatrix(transform.orientation, toTransform.orientation)
        }
    };
};
export const inverseTransformTransform = (position: Vector3, inverseOrientation: Matrix3) => (transform: Transform): Transform => {
	return {
		position: inverseTransformPoint(position, inverseOrientation)(transform.position),
		orientation: multiplyMatrix(inverseOrientation, transform.orientation)
    }
};