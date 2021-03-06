import { normalize, multiply, cross, dot, distance, add, subtract, isZero, magnitude } from "./vec3";
import { Matrix3, Vector3 } from './types';

export const identity: Matrix3 = [1, 0, 0, 0, 1, 0, 0, 0, 1];

export const multiplyVector = (matrix: Matrix3, vector: Vector3) : Vector3 => [
    matrix[0] * vector[0] + matrix[3] * vector[1] + matrix[6] * vector[2],
    matrix[1] * vector[0] + matrix[4] * vector[1] + matrix[7] * vector[2],
    matrix[2] * vector[0] + matrix[5] * vector[1] + matrix[8] * vector[2]
];
export const multiplyMatrix = (a: Matrix3, b: Matrix3): Matrix3 => [
    ...multiplyVector(a, b.slice(0, 3) as Vector3),
    ...multiplyVector(a, b.slice(3, 6) as Vector3),
    ...multiplyVector(a, b.slice(6, 9) as Vector3),
] as Matrix3;

export const inverse = (matrix: Matrix3): Matrix3 => {
    const [a, b, c, d, e, f, g, h, i] = matrix;
    const vals = [
        e * i - f * h, f * g - i * d, h * d - g * e,
        b * i - c * h, c * g - a * i, h * a - g * b,
        e * c - f * b, f * a - d * c, b * d - a * e
    ];
    const m = 1 / (a * vals[0] + b * vals[1] + c * vals[2]);
    const n = 1 / (d * vals[3] + e * vals[4] + f * vals[5]);
    const o = 1 / (g * vals[6] + h * vals[7] + i * vals[8]);

    return [
        vals[0] * m, vals[3] * n, vals[6] * o,
        vals[1] * m, vals[4] * n, vals[7] * o,
        vals[2] * m, vals[5] * n, vals[8] * o
    ];
};

const rotateVector = (axis: Vector3, angle: number) => ((vec: Vector3) => {
    const sinDir = normalize(cross(axis, vec));
    const axisCenter = multiply(axis, dot(axis, vec));
    const cosDir = normalize(subtract(vec, axisCenter));
    const [sin, cos] = [Math.sin(angle), Math.cos(angle)];
    const radius = distance(axisCenter, vec);
    return add(axisCenter, multiply(add(multiply(sinDir, sin), multiply(cosDir, cos)), radius));
});
export const rotation = (vector: Vector3) : Matrix3 => {
    if (isZero(vector)){
        return identity;
    }
    const axis = normalize(vector);
    const angle = magnitude(vector);
    const rotateFunc = rotateVector(axis, angle);
    return [
        ...rotateFunc([1, 0, 0]),
        ...rotateFunc([0, 1, 0]),
        ...rotateFunc([0, 0, 1])
    ] as Matrix3;
};

export const scale = ([x, y, z]: Vector3): Matrix3 => [
	x, 0, 0,
	0, y, 0,
	0, 0, z
];

export const uniformScale = (s: number) => scale([s, s, s]);