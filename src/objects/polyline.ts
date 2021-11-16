import { drawPolyline } from "../../lib/ctx-util";
import { Vector3 } from "../../lib/types";
import { RenderArgs } from "./render-args";

export const drawPolyline3D = (args: RenderArgs) => (points: Vector3[], style?: Partial<CanvasRenderingContext2D>) => {
	drawPolyline(args.ctx, points.map(args.worldToCanvas), style);
};