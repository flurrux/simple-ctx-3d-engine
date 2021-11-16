import { Morphism, Vector2, Vector3 } from '../lib/types';
import * as Vec3 from '../lib/vec3';

export const vec3ToColor = (v: Vector3) => `rgb(${Vec3.round(v).join(",")})`
export const scaleVector = (scale: number) => ((vec: Vector2) => [vec[0] * scale, vec[1] * scale]);
