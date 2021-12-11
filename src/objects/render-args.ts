import { Morphism, Vector2, Vector3 } from "../../lib/types";
import { CameraWithProjectionSettings } from "../camera/orbit-camera";

export type RenderArgs = {
	ctx: CanvasRenderingContext2D,
	camera: CameraWithProjectionSettings,
	worldToCanvas: Morphism<Vector3, Vector2>,
	worldToCam: Morphism<Vector3, Vector3>,
	camToCanvas: Morphism<Vector3, Vector2>,
	[key: (string | number | symbol)]: any
};