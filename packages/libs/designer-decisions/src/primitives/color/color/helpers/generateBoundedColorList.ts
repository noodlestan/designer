import chroma from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral } from '../../../../inputs';
import { COLOR_FORMAT_OKLCH, type Color, chromaColorToLiteral } from '../../../color';

export const generateBoundedColorList = <T extends ColorObjectLiteral = ColorObjectLiteral>(
    fromValue: Color,
    toValue: Color,
    steps: number = 0,
    format: ColorFormat = COLOR_FORMAT_OKLCH,
): T[] => {
    const from = fromValue.raw();
    const to = toValue.raw();

    if (steps < 1) {
        return [fromValue.toObject({ format }), toValue.toObject({ format })] as T[];
    }

    const s = Math.floor(steps);
    const colors = chroma
        .scale([from, to])
        .mode(COLOR_FORMAT_OKLCH)
        .colors(s + 2);

    return colors.map(color => chromaColorToLiteral(chroma(color), format));
};
