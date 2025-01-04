import chroma from 'chroma-js';

import type { ColorSRGBHSLiteral, ColorValue } from '../../../types';

export const generateBoundedColorList = (
    fromValue: ColorValue,
    toValue: ColorValue,
    steps: number,
): ColorSRGBHSLiteral[] => {
    const from = fromValue.get();
    const to = toValue.get();

    const colors = chroma.scale([from, to]).mode('oklab').colors(steps);

    return colors.map(color => {
        const [h, s, l] = chroma(color).hsl();
        return { h: h || 0, s: s || 0, l: l || 0 };
    });
};
