import chroma from 'chroma-js';

import type { ColorSpaceHSLLiteralInput, ColorValue } from '../../../types';

export const createInterpolatedColorSet = (
    fromValue: ColorValue,
    toValue: ColorValue,
    steps: number,
): ColorSpaceHSLLiteralInput[] => {
    const fromColor = fromValue.get();
    const toColor = toValue.get();

    const interpolatedColors = chroma.scale([fromColor, toColor]).mode('lab').colors(steps);

    return interpolatedColors.map(color => {
        const [h, s, l] = chroma(color).hsl();
        return { h: h || 0, s: s || 0, l: l || 0 };
    });
};
