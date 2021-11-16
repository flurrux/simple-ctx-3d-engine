import { filter, map } from "fp-ts/lib/Array";
import { pipe } from "fp-ts/lib/function";
import { pathPolygon } from "../../../rigidbody-rotation-sim/src/face-rendering";
import { drawPolygon, drawPolyline } from "../../lib/ctx-util";
import { Transform } from "../../lib/transform";
import { Vector2, Vector3 } from "../../lib/types";
import { transformTransformToCamSpace } from "../camera/camera";
import { FaceObject, isFacingCamInCamSpace, projectVertices, transformFace } from "./face";
import { RenderArgs } from "./render-args";

export type FaceMesh = {
	faces: FaceObject[],
	transform: Transform
};

type TransformOwner = {
	transform: Transform
};

export function getPosition<T extends TransformOwner>(t: T): Vector3 {
	return t.transform.position;
}

export const drawFaceMesh = (args: RenderArgs) => (faceMesh: FaceMesh, style?: Partial<CanvasRenderingContext2D>) => {
	const { faces, transform } = faceMesh;
	const camSpaceTransform = transformTransformToCamSpace(args.camera)(transform);
	const canvasPolygons = pipe(
		faces,
		map(transformFace(camSpaceTransform)),
		filter(isFacingCamInCamSpace),
		map(projectVertices(args.camToCanvas))
	);

	drawCanvasPolygons(args.ctx, canvasPolygons, style);
};

const drawCanvasPolygons = (ctx: CanvasRenderingContext2D, polygons: Vector2[][], style?: Partial<CanvasRenderingContext2D>) => {
	ctx.save();
	polygons.forEach(
		poly => drawPolygon(ctx, poly, style)
	);
	polygons.forEach(
		poly => drawPolyline(ctx, poly, style)
	);
	ctx.restore();
};