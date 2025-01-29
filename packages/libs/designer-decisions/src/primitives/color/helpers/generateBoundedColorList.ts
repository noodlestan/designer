import chroma from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral, ColorValue } from '../../../types';

import { chromaColorToLiteral } from './functions';

export const generateBoundedColorList = <T extends ColorObjectLiteral = ColorObjectLiteral>(
    fromValue: ColorValue,
    toValue: ColorValue,
    steps: number = 0,
    format: ColorFormat = 'oklch',
): T[] => {
    const from = fromValue.get();
    const to = toValue.get();

    if (steps < 1) {
        return [fromValue.toObject(format), toValue.toObject(format)] as T[];
    }

    const s = Math.floor(steps);
    const colors = chroma
        .scale([from, to])
        .mode('oklab')
        .colors(s + 2);

    return colors.map(color => chromaColorToLiteral(chroma(color), format));
};
