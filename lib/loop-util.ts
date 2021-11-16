import { Morphism } from "./types";

type LoopArgs = {
	dt: number,
	t: number
};
export const startLoop = (onLoop: Morphism<LoopArgs, void>) => {
	let accumTime = 0;
	let prevTime = 0;
	const loop = () => {
		const curTime = window.performance.now();
		const deltaTime = (curTime - prevTime) / 1000;
		accumTime += deltaTime;
		prevTime = curTime;
		onLoop({ dt: deltaTime, t: accumTime });
		requestAnimationFrame(loop);
	};
	requestAnimationFrame(loop);
};
