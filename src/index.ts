export { setupSimpleCtx3dScene } from "./scene-setup";



import { drawPolyline3D } from './objects/polyline';
import { drawDisc3D } from './objects/disc';
import { drawFaceMesh, getPosition as getFaceMeshPosition, getPosition } from './objects/face-mesh';
import { drawWireMesh } from './objects/wire-mesh';
import { cubeFaceMesh, cubeWireMesh } from './objects/cube-geometry';

export const objects = {
	polyline: {
		draw: drawPolyline3D
	},
	disc: {
		draw: drawDisc3D
	},
	faceMesh: {
		draw: drawFaceMesh,
		cube: cubeFaceMesh,
		getPosition: getFaceMeshPosition
	},
	wireMesh: {
		draw: drawWireMesh,
		cube: cubeWireMesh
	}
};



import { sortByCamSpaceZ } from './sorting-util';

export const sorting = {
	byCamSpaceZ: sortByCamSpaceZ
};