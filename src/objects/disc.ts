import { drawDisc } from '../../lib/ctx-util';
import { Vector3 } from '../../lib/types';
import { RenderArgs } from './render-args';

export const drawDisc3D = (args: RenderArgs) => (radius: number, style?: Partial<CanvasRenderingContext2D>) => (position: Vector3) => {
	const camSpacePosition = args.worldToCam(position);
	// if (applyDistanceScale){
	// 	radius = radius / magnitude(camSpacePosition);
	// }
	const canvasPosition = args.camToCanvas(camSpacePosition);
	drawDisc(args.ctx, canvasPosition, radius, style);
};