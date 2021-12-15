import { inverse } from "../../lib/mat3x3";
import { Transform } from "../../lib/transform";
import { Vector3 } from "../../lib/types";
import { add } from "../../lib/vec3";
import { Camera } from "./camera";
import { isPerspectiveSetting } from "./combined-projection";
import { calculateTransform, OrbitParams } from "./orbit-rig";
import { OrthographicSettings } from "./orthographic-projection";
import { PerspectiveSettings } from "./perspective-projection";

type ProjectionSettings = PerspectiveSettings | OrthographicSettings;

export type OrbitCamera = {
	orbitParams: OrbitParams,
	orbitCenter: Vector3,
	projectionSettings: ProjectionSettings
};

export const defaultOrbitCamera: OrbitCamera = {
	orbitParams: {
		radius: 5,
		latitude: 0,
		longitude: 0,
	},
	orbitCenter: [0, 0, 0],
	projectionSettings: {
		fieldOfViewDeg: 56
		// size: 5
	}
};

export type CameraWithProjectionSettings = Camera & {
	projectionSettings: ProjectionSettings
};

export function toRegularCameraWithProjectionSettings(orbitCam: OrbitCamera): CameraWithProjectionSettings {
	const localTransform = calculateTransform(orbitCam.orbitParams);
	const transform: Transform = {
		...localTransform,
		position: add(localTransform.position, orbitCam.orbitCenter)	
	};
	return {
		transform, 
		inverseMatrix: inverse(transform.orientation),
		projectionSettings: orbitCam.projectionSettings
	}
}

export function assignRadiusToOrthoSizeIfOrthographic(camera: OrbitCamera): OrbitCamera {
	if (isPerspectiveSetting(camera.projectionSettings)) return camera;
	return {
		...camera,
		projectionSettings: {
			...camera.projectionSettings,
			size: camera.orbitParams.radius
		}
	}
}