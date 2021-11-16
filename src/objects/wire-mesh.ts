import { drawPolyline } from "../../lib/ctx-util";
import { Vector3 } from "../../lib/types";
import { RenderArgs } from "./render-args";

export type WireMesh = {
	vertices: Vector3[],
	lines: [number, number][]
};
export const drawWireMesh = (args: RenderArgs) => (wireMesh: WireMesh, style?: Partial<CanvasRenderingContext2D>) => {
	const { ctx } = args;
	const canvasVertices = wireMesh.vertices.map(args.worldToCanvas);
	ctx.save();
	for (const line of wireMesh.lines) {
		drawPolyline(ctx, line.map(i => canvasVertices[i]), style);
	}
	ctx.restore();
};