import { Vector3 } from "./types";
import { normalize } from "./vec3";



export const randomVector = (maxMag: number = 2): Vector3 => [0, 1, 2].map(() => (Math.random() - 0.5) * maxMag) as Vector3;

export const randomColor = (): string => `rgb(${[0, 1, 2].map(() => Math.round(Math.random() * 255)).join(",")})`;
export const randomRange = (min: number, max: number) => min + (max - min) + Math.random();
export const randomUnitVector = (): Vector3 => normalize([0, 1, 2].map(() => Math.random() - 0.5) as Vector3);

