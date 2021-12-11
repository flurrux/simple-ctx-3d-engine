import { Transform, transformPoint, transformTransform } from "../../lib/transform";
import { Morphism, Vector2, Vector3 } from "../../lib/types";
import { add, dot } from "../../lib/vec3";
import { ProjectionType } from "../camera/combined-projection";

export type FaceObject = {
	transform: Transform,
	polygon: Vector2[]
};

type TransformOwner = {
	transform: Transform
};

export const isPlaneTransformFacingCameraInCamSpace = (projType: ProjectionType) => (transform: Transform): boolean => {
	const planeNormal = transform.orientation.slice(6) as Vector3;
	if (projType === "perspective"){
		return dot(transform.position, planeNormal) < 0;
	}
	if (projType === "orthographic"){
		return dot(planeNormal, [0, 0, 1]) < 0;
	}
};

export const isFacingCamInCamSpace = (projType: ProjectionType) => <T extends TransformOwner>(face: T): boolean => {
	return isPlaneTransformFacingCameraInCamSpace(projType)(face.transform);
};


const vec2ToVec3 = (vec2: Vector2): Vector3 => [vec2[0], vec2[1], 0];
const getGlobalPolygon = (face: FaceObject): Vector3[] => face.polygon.map(vec2ToVec3).map(transformPoint(face.transform));
export const projectVertices = (camToCanvas: Morphism<Vector3, Vector2>) => (face: FaceObject): Vector2[] => {
	return getGlobalPolygon(face).map(camToCanvas);
};

export const translateFace = (translation: Vector3) => <T extends TransformOwner>(face: T): T => {
	return {
		...face,
		transform: {
			...face.transform,
			position: add(face.transform.position, translation)
		}
	};
};
export const translateFaces = (translation: Vector3) => <T extends TransformOwner>(faces: T[]): T[] => {
	return faces.map(translateFace(translation));
};

export const transformFace = (transform: Transform) => <T extends TransformOwner>(face: T): T => {
	return {
		...face,
		transform: transformTransform(transform)(face.transform)
	}
};







export const createQuadPolygon = (halfWidth: number, halfHeight: number): Vector2[] => {
	return [
		[halfWidth, halfHeight],
		[halfWidth, -halfHeight],
		[-halfWidth, -halfHeight],
		[-halfWidth, halfHeight]
	];
};