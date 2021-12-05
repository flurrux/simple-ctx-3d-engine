import { Vector2, Vector3 } from '../../lib/types';

export type OrthographicSettings = {
	size: number
};

export type OrthographicPlane = {
	width: number, 
	height: number
};

export function makeOrthographicPlane(settings: OrthographicSettings, canvas: HTMLCanvasElement): OrthographicPlane {
	const [canvasWidth, canvasHeight] = [canvas.width, canvas.height];
	const aspectRatio = canvasWidth / canvasHeight;
	const avgSize = settings.size;
	const height = 2 * avgSize / (aspectRatio + 1);
	const width = height * aspectRatio;
	return { width, height };
}

export const projectPoint = (orthographicPlane: OrthographicPlane) => (camSpacePoint: Vector3): Vector2 => {
	return [
		camSpacePoint[0] / orthographicPlane.width,
		camSpacePoint[1] / orthographicPlane.height
	]
};