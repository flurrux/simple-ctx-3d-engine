import { Vector2, Vector3 } from '../../lib/types';

export type PerspectiveSettings = {
	fieldOfViewDeg: number
};
export type PerspectiveFrustum = {
	widthPerZ: number,
	heightPerZ: number
};

export function makeFrustum(settings: PerspectiveSettings, canvas: HTMLCanvasElement): PerspectiveFrustum {
    const [canvasWidth, canvasHeight] = [canvas.width, canvas.height];
	const aspectRatio = canvasWidth / canvasHeight;
	const widthPerZ = Math.tan((settings.fieldOfViewDeg / 360) * Math.PI);
	const heightPerZ = widthPerZ / aspectRatio;
	return { widthPerZ, heightPerZ };
}

export const projectPoint = (frustum: PerspectiveFrustum) => (camSpacePoint: Vector3): Vector2 => {
	const z = camSpacePoint[2];
	return [
		camSpacePoint[0] / (frustum.widthPerZ * z),
		camSpacePoint[1] / (frustum.heightPerZ * z)
	]
};

export const projectPoints = (frustum: PerspectiveFrustum) => (camSpacePoints: Vector3[]) => camSpacePoints.map(
	projectPoint(frustum)
);