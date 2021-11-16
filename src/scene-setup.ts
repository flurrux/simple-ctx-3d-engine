import { flow } from 'fp-ts/lib/function';
import { Morphism, Transformation, Vector2, Vector3 } from '../lib/types';
import { OrbitCamera, toRegularCamera } from './camera/orbit-camera';
import { setupOrbitCameraControl } from './camera/orbit-camera-control';
import { PerspectiveCamera } from './camera/perspective-camera';
import { camPointToScreenPoint, worldPointToCamPoint } from './space-conversion';
import { adjustCanvasSizeToWindow, autoAdjustCanvasSize, createCanvasInBody } from '../lib/canvas-util';


type Vec3ToVec2 = Morphism<Vector3, Vector2>;

type RenderFuncArgs = {
	ctx: CanvasRenderingContext2D,
	camera: PerspectiveCamera,
	width: number, height: number,
	worldToCam: Morphism<Vector3, Vector3>,
	camToCanvas: Vec3ToVec2,
	worldToCanvas: Vec3ToVec2,
};


export type SceneArgs = {
	//if no canvas is given, then a new fullscreen canvas is created in the body
	canvas?: HTMLCanvasElement,
	backgroundColor?: string,
	renderScene: Morphism<RenderFuncArgs, void>,
	onCamChanged?: Morphism<OrbitCamera, void>
};

type CamTransformation = Transformation<OrbitCamera>;

export type SceneController = {
	transformCamera: Morphism<CamTransformation, void>,
	performRender: () => void
};



export function setupSimpleCtx3dScene(args: SceneArgs): SceneController {
	
	let canvas: HTMLCanvasElement = null;
	if (args.canvas){
		canvas = args.canvas;
	}
	else {
		canvas = createCanvasInBody();
		autoAdjustCanvasSize(
			canvas, 
			() => render()
		);
		adjustCanvasSizeToWindow(canvas);
	}

	let camera: OrbitCamera = {
		radius: 10,
		latitude: 0,
		longitude: 0,
	};

	const transformCamera = (transformation: CamTransformation) => {
		camera = transformation(camera);
		render();
	};

	const ctx = canvas.getContext("2d");
	const backgroundColor = args.backgroundColor || "#d4d3d2";

	const render = () => {

		const { canvas } = ctx;
		const [w, h] = [canvas.width, canvas.height];

		ctx.save();
		ctx.fillStyle = backgroundColor;
		ctx.fillRect(0, 0, w, h);
		ctx.translate(w / 2, h / 2);
		ctx.scale(window.devicePixelRatio, -window.devicePixelRatio);

		const perspectiveCam = {
			...toRegularCamera(camera),
			settings: {
				planeWidthHalf: canvas.width,
				planeHeightHalf: canvas.height,
				zScale: 2000
			}
		} as PerspectiveCamera;
		
		Object.assign(ctx, {
			strokeStyle: "#3b3a39",
			lineWidth: 2,
			lineJoin: "round"
		} as Partial<CanvasRenderingContext2D>);

		const worldToCam = worldPointToCamPoint(perspectiveCam);
		const camToCanvas = camPointToScreenPoint(ctx, perspectiveCam);
		args.renderScene({
			ctx, width: w, height: h,
			camera: perspectiveCam,
			worldToCam, camToCanvas,
			worldToCanvas: flow(worldToCam, camToCanvas)
		});

		ctx.restore();
	};

	setupOrbitCameraControl(
		canvas, 
		(transformation) => {
			transformCamera(transformation);
			if (args.onCamChanged){
				args.onCamChanged(camera);
			}
		}
	);
	render();

	return { 
		transformCamera, 
		performRender: render
	};
}
