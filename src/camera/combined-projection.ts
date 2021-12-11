import { Morphism, Vector2, Vector3 } from "../../lib/types";
import { makeOrthographicPlane, OrthographicSettings } from "./orthographic-projection";
import { makeFrustum, PerspectiveSettings, projectPoint as perspectiveProject } from './perspective-projection';
import { projectPoint as orthoProject } from './orthographic-projection';

export type ProjectionType = "orthographic" | "perspective";
export function getProjectionType(setting: ProjectionSettings): ProjectionType {
	return isPerspectiveSetting(setting) ? "perspective" : "orthographic";
}

export type ProjectionSettings = PerspectiveSettings | OrthographicSettings;
export function isPerspectiveSetting(setting: ProjectionSettings): setting is PerspectiveSettings {
	return "fieldOfViewDeg" in setting;
}
export type ProjectionFunc = Morphism<Vector3, Vector2>;
export const makeProjectionFunc = (settings: ProjectionSettings, canvas: HTMLCanvasElement): ProjectionFunc => {
	if (isPerspectiveSetting(settings)){
		return perspectiveProject(
			makeFrustum(settings, canvas)
		);
	}
	return orthoProject(
		makeOrthographicPlane(settings, canvas)
	);
};