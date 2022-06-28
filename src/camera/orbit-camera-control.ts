import { Morphism, Transformation } from "../../lib/types";
import { OrbitParams } from "./orbit-rig";

export function setupOrbitCameraControl<T extends OrbitParams>(
	canvas: HTMLCanvasElement, 
	transformCamera: Morphism<Transformation<T>, void>) {
	
	const dragSensitivity = 0.01;
	const zoomSensitivity = 0.001;

	let dragging = false;
	canvas.addEventListener(
		"pointerdown", 
		() => dragging = true
	);
	document.addEventListener("pointermove", e => {
		if (!dragging) return;
		e.preventDefault();
		transformCamera(
			cam => ({
				...cam,
				longitude: cam.longitude + e.movementX * dragSensitivity,
				latitude: cam.latitude + e.movementY * dragSensitivity
			})
		);
	});
	document.addEventListener(
		"pointerup",
		() => dragging = false
	);
	canvas.addEventListener("wheel", e => {
		e.preventDefault();
		transformCamera(
			cam => ({
				...cam,
				radius: cam.radius * (1 + e.deltaY * zoomSensitivity)
			})
		);
	});
}