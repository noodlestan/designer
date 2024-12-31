import chroma from 'chroma-js';

import type { ColorOkLCHLiteral, ColorValue } from '../../../types';

export const createBoundedColorList = (
    fromValue: ColorValue,
    toValue: ColorValue,
    steps: number,
): ColorOkLCHLiteral[] => {
    const from = fromValue.get();
    const to = toValue.get();

    const colors = chroma
        .scale([from, to])
        .mode('lab')
        .colors(steps + 2);

    return colors.map(color => {
        const [l, c, h] = chroma(color).oklch();
        return { l: l || 0, c: c || 0, h: h || 0 };
    });
};
