import { multiplyVector } from '../../lib/mat3x3';
import { inverseTransformTransform, Transform } from '../../lib/transform';
import { Vector3, Matrix3 } from '../../lib/types';
import { subtract } from '../../lib/vec3';

export interface Camera {
	transform: Transform,
	inverseMatrix: Matrix3,
}

export const toCamSpace = (cam: Camera) => (worldPoint: Vector3): Vector3 => {
	return multiplyVector(
		cam.inverseMatrix, 
		subtract(worldPoint, cam.transform.position)
	) 
};

export const transformTransformToCamSpace = (cam: Camera) => inverseTransformTransform(
	cam.transform.position,
	cam.inverseMatrix
);