import { range } from "fp-ts/es6/Array";
import { flow, identity } from "fp-ts/es6/function";
import { drawDisc } from "../lib/ctx-util";
import { randomColor } from "../lib/random-util";
import { Vector3 } from "../lib/types";
import { add, magnitude, multiply, vector3 } from "../lib/vec3";
import { cubeFaceMesh, cubeVertices, cubeWireMesh } from "../src/objects/cube-geometry";
import { drawDisc3D } from "../src/objects/disc";
import { drawFaceMesh, FaceMesh, getPosition } from "../src/objects/face-mesh";
import { drawPolyline3D } from "../src/objects/polyline";
import { XZQuadVertices } from "../src/objects/quad-geometry";
import { drawWireMesh, WireMesh } from "../src/objects/wire-mesh";
import { setupSimpleCtx3dScene } from "../src/scene-setup";
import { sortByCamSpaceZ } from "../src/sorting-util";

function randomPointInCube(): Vector3 {
	return [0, 1, 2].map(
		v => Math.random() * 2 - 1
	) as Vector3;
}
function randomPointInSphere(): Vector3 {
	for (let i = 0; i < 1000; i++){
		const cubePoint = randomPointInCube();
		if (magnitude(cubePoint) > 1) continue;
		return cubePoint;
	}
	return [0, 0, 0];
}

// const pointCloud = range(0, 40).map(randomPointInSphere);
const pointCloud = cubeVertices;
// const pointCloud = range(0, 100).map(z => [1, 0, z * 0.4]);

const outlineMesh: WireMesh = {
	...cubeWireMesh,
	vertices: cubeWireMesh.vertices.map(
		vert => multiply(vert, 1.5)
	)
};

// const spiral = normalizedValues(500).map(v => v - 0.5).map(
// 	p => {
// 		const angle = 80 * p;
// 		const radius = 0.3 * (1 + 0.6 * Math.cos(6 * p));
// 		return vector3(
// 			radius * Math.sin(angle),
// 			radius * Math.cos(angle),
// 			3 * p
// 		)
// 	}
// );

type FaceMeshWithColor = FaceMesh & { color: string };

const cubes: FaceMeshWithColor[] = [vector3(-1.2, 0, 0), vector3(+1.2, 0, 0)].map(
	position => ({
		...cubeFaceMesh,
		transform: {
			...cubeFaceMesh.transform,
			position,
		},
		color: randomColor()
	})
);

const useOcclusionSorting = false;

setupSimpleCtx3dScene({
	renderScene: (args) => {
		// const sortedPoints = sortByCamSpaceZ<Vector3>(identity, args.worldToCam)(pointCloud);
		// sortedPoints.forEach(
		// 	drawDisc3D(args)(10, { fillStyle: "orange", strokeStyle: "black", lineWidth: 3 })
		// );
		
		// drawWireMesh(args)(outlineMesh, { strokeStyle: "black", lineWidth: 3 });

		// drawPolyline3D(args)(
		// 	XZQuadVertices.map(v => add(v, [0, 0, 0])), 
		// 	{ strokeStyle: "#292929", lineWidth: 3 }
		// );

		drawFaceMesh(args)(
			cubeFaceMesh,
			{ fillStyle: "#42b6f5", strokeStyle: "#292929", lineWidth: 3 }
		);
		
		// drawPolyline3D(args)(spiral, { lineWidth: 3, strokeStyle: "#b26be8" });
		
		// let cubesToRender = cubes;
		// if (useOcclusionSorting){
		// 	cubesToRender = sortByCamSpaceZ(getPosition, args.worldToCam)(cubes);
		// }
		// cubesToRender.forEach(
		// 	cube => drawFaceMesh(args)(
		// 		cube,
		// 		{ fillStyle: cube.color, strokeStyle: "#292929", lineWidth: 3 }
		// 	)
		// );
	}
});