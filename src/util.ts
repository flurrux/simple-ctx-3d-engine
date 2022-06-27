import { Vector2, Vector3 } from '../lib/types';
import { round } from '../lib/vec3';

export const vec3ToColor = (v: Vector3) => `rgb(${round(v).join(",")})`
export const scaleVector = (scale: number) => ((vec: Vector2) => [vec[0] * scale, vec[1] * scale]);
