import { identityTransform } from "../../lib/transform";
import { Vector3 } from "../../lib/types";
import { createQuadPolygon, FaceObject } from "./face";
import { FaceMesh } from "./face-mesh";
import { WireMesh } from "./wire-mesh";

export const cubeVertices: Vector3[] = [
	[+1, +1, +1], [-1, +1, +1],
	[+1, -1, +1], [-1, -1, +1],
	[+1, +1, -1], [-1, +1, -1],
	[+1, -1, -1], [-1, -1, -1],
];

export const cubeWireMesh: WireMesh = {
	vertices: cubeVertices,
	lines: [
		[0, 1], [2, 3], [4, 5], [6, 7],
		[0, 2], [1, 3], [4, 6], [5, 7],
		[0, 4], [1, 5], [2, 6], [3, 7]
	]
};


const cuboidFaces = (function(){
	const cuboidFacePolygon = createQuadPolygon(0.5, 0.5);
	return [
		{
			transform: {
				orientation: [0, 0, 1, 0, 1, 0, 1, 0, 0],
				position: [+0.5, 0, 0],
			},
			polygon: cuboidFacePolygon
		},
		{
			transform: {
				orientation: [0, 0, 1, 0, 1, 0, -1, 0, 0],
				position: [-0.5, 0, 0],
			},
			polygon: cuboidFacePolygon
		},
		{
			transform: {
				orientation: [1, 0, 0, 0, 1, 0, 0, 0, 1],
				position: [0, 0, +0.5],
			},
			polygon: cuboidFacePolygon
		},
		{
			transform: {
				orientation: [1, 0, 0, 0, 1, 0, 0, 0, -1],
				position: [0, 0, -0.5],
			},
			polygon: cuboidFacePolygon
		},
		{
			transform: {
				orientation: [1, 0, 0, 0, 0, 1, 0, 1, 0],
				position: [0, +0.5, 0],
			},
			polygon: cuboidFacePolygon
		},
		{
			transform: {
				orientation: [1, 0, 0, 0, 0, 1, 0, -1, 0],
				position: [0, -0.5, 0],
			},
			polygon: cuboidFacePolygon
		},
	] as FaceObject[];
})();

export const cubeFaceMesh: FaceMesh = {
	transform: identityTransform,
	faces: cuboidFaces
};