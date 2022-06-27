import { flow, identity } from 'fp-ts/es6/function';
import { multiplyVector } from '../lib/mat3x3';
import { Vector2, Vector3 } from '../lib/types';
import * as Vec3 from '../lib/vec3';
import { Camera } from './camera/camera';
import { makeProjectionFunc, ProjectionFunc, ProjectionSettings } from './camera/combined-projection';

export type ViewportSettings = {
	scale: number,
	normalizedOffset: Vector2
};

export const viewportToCanvas = (settings: ViewportSettings) => (ctx: CanvasRenderingContext2D) => {
	const { canvas } = ctx;
	const { normalizedOffset } = settings;
	const [offsetX, offsetY] = normalizedOffset;
	const scale = settings.scale;
	return (point: Vector2): Vector2 => {
		const [w, h] = [canvas.clientWidth, canvas.clientHeight];
		return [
			w * (offsetX + point[0] * scale),
			h * (offsetY - point[1] * scale)
		]
	};
};


export const camPointToScreenPoint = (viewport: ViewportSettings, projSettings: ProjectionSettings, ctx: CanvasRenderingContext2D): ProjectionFunc => {
	return flow(
		makeProjectionFunc(projSettings, ctx.canvas),
		viewportToCanvas(viewport)(ctx)
	);
};

export const worldPointToCamPoint = (camera: Camera) => (worldPoint: Vector3): Vector3 => {
	return multiplyVector(
		camera.inverseMatrix,
		Vec3.subtract(worldPoint, camera.transform.position)
	)
};

export const worldPointToScreenPoint = (ctx: CanvasRenderingContext2D, camera: Camera, settings: ProjectionSettings, viewport: ViewportSettings) => flow(
	worldPointToCamPoint(camera),
	camPointToScreenPoint(viewport, settings, ctx)
);