import type { ColorModifierInput, ColorSpaceHSLLiteralInput, ColorValue } from '../../../types';
import { createNumberSteppedSeries } from '../../number';

export const createColorSteppedSeries = (
    startValue: ColorValue,
    steps: number,
    modifier: ColorModifierInput,
): ColorSpaceHSLLiteralInput[] => {
    const { h, s, l } = startValue.getSpace('hsl') as ColorSpaceHSLLiteralInput;
    const hueSeries = createNumberSteppedSeries(h, steps, modifier.hue, [0, 360]);
    const saturationSeries = createNumberSteppedSeries(s, steps, modifier.saturation, [0, 1]);
    const lightnessSeries = createNumberSteppedSeries(l, steps, modifier.lightness, [0, 1]);

    return hueSeries.map((hue, index) => ({
        h: hue,
        s: saturationSeries[index],
        l: lightnessSeries[index],
    }));
};
