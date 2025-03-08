import type { ColorSRGBLightnessScaleAnchoredInput } from '../../../inputs';
import { generateAnchoredSeries } from '../../../primitives';
import {
    type SRGBLightnessScale,
    createSRGBLightnessScale,
    createSRGBLightnessValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBLightnessScaleAnchoredModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleAnchoredInput
> = () => {
    return {
        produce: context => {
            const { anchor, before, after, quantize } = context.params() || {};

            const options = { quantize };
            const { value: anchorValue } = createSRGBLightnessValue(
                context.forValue(anchor),
                options,
            );

            const seriesParams = { before, after, quantize };
            const series = generateAnchoredSeries(anchorValue, seriesParams);
            const values = series.map(channel =>
                createSRGBLightnessValue(context.forValue(channel), options),
            );

            return createSRGBLightnessScale(context.forValue(values));
        },
    };
};
