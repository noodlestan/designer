import chroma from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral } from '../../../../inputs';
import { COLOR_FORMAT_OKLCH } from '../constants';
import { chromaColorToLiteral } from '../functions';
import type { ColorValue } from '../types';

export const generateBoundedColorList = <T extends ColorObjectLiteral = ColorObjectLiteral>(
    fromValue: ColorValue,
    toValue: ColorValue,
    steps: number = 0,
    format: ColorFormat = COLOR_FORMAT_OKLCH,
): T[] => {
    const from = fromValue.get();
    const to = toValue.get();

    if (steps < 1) {
        return [fromValue.toObject(format), toValue.toObject(format)] as T[];
    }

    const s = Math.floor(steps);
    const colors = chroma
        .scale([from, to])
        .mode(COLOR_FORMAT_OKLCH)
        .colors(s + 2);

    return colors.map(color => chromaColorToLiteral(chroma(color), format));
};
