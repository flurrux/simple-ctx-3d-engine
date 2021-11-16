import { Morphism, Transformation } from "../../lib/types";
import { OrbitCamera } from "./orbit-camera";

export function setupOrbitCameraControl<T extends OrbitCamera>(
	canvas: HTMLCanvasElement, 
	transformCamera: Morphism<Transformation<T>, void>) {
	
	canvas.addEventListener("mousemove", e => {
		if (e.buttons !== 1) return;
		const s = 0.01;
		transformCamera(
			cam => ({
				...cam,
				longitude: cam.longitude + e.movementX * s,
				latitude: cam.latitude + e.movementY * s
			})
		);
	});
	canvas.addEventListener("wheel", e => {
		transformCamera(
			cam => ({
				...cam,
				radius: cam.radius * (1 + e.deltaY * 0.001)
			})
		);
	});
}