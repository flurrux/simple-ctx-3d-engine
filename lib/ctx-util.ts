import { Vector2 } from "./types";

export const pathPolygon = (ctx: CanvasRenderingContext2D, polygon: Vector2[]) => {
	pathPolyline(ctx, polygon);
	ctx.closePath();
};

export const drawPolygon = (ctx: CanvasRenderingContext2D, polygon: Vector2[], style?: Partial<CanvasRenderingContext2D>) => {
	ctx.save();
	if (style) {
		Object.assign(ctx, style);
	}
	pathPolygon(ctx, polygon);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
};


export const pathPolyline = (ctx: CanvasRenderingContext2D, polyline: Vector2[]) => {
	if (polyline.length < 2) return;
	ctx.beginPath();
	ctx.moveTo(...polyline[0]);
	polyline.slice(1).map(point => ctx.lineTo(...point));
};

export const drawPolyline = (ctx: CanvasRenderingContext2D, polyline: Vector2[], style?: Partial<CanvasRenderingContext2D>) => {
	ctx.save();
	if (style) {
		Object.assign(ctx, style);
	}
	pathPolyline(ctx, polyline);
	ctx.stroke();
	ctx.restore();
};


export function drawDisc(ctx: CanvasRenderingContext2D, point: Vector2, radius: number, style?: Partial<CanvasRenderingContext2D>) {
	ctx.save();
	if (style) {
		Object.assign(ctx, style);
	}
	ctx.beginPath();
	ctx.arc(point[0], point[1], radius, 0, Math.PI * 2);
	ctx.fill();
	ctx.stroke();
	ctx.restore();
}