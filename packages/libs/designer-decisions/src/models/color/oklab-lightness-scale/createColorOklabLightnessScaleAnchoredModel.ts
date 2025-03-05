import type { ColorOklabLightnessScaleAnchoredInput } from '../../../inputs';
import { generateAnchoredSeries } from '../../../primitives';
import {
    type OklabLightnessScale,
    createOklabLightnessScale,
    createOklabLightnessValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabLightnessScaleAnchoredModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleAnchoredInput
> = () => {
    return {
        produce: context => {
            const { anchor, before, after, quantize } = context.params() || {};

            const options = { quantize };
            const { value: anchorValue } = createOklabLightnessValue(context, anchor, {
                quantize,
            }).get();

            const seriesParams = { before, after, quantize };
            const series = generateAnchoredSeries(anchorValue, seriesParams);
            const values = series.map(channel =>
                createOklabLightnessValue(context, channel, options),
            );

            return createOklabLightnessScale(context, values);
        },
    };
};
