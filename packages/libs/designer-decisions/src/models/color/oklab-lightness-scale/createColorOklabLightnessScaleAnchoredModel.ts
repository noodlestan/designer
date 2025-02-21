import type { ColorOklabLightnessScaleAnchoredInput } from '../../../inputs';
import {
    type OklabLightnessScale,
    createOklabLightnessScale,
    createOklabLightnessValue,
    generateAnchoredSeries,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabLightnessScaleAnchoredModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleAnchoredInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const anchorValue = createOklabLightnessValue(context.nestedContext(), params.anchor, {
                quantize,
            });
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(item =>
                createOklabLightnessValue(context.nestedContext(), item, { quantize }),
            );
            return createOklabLightnessScale(context.nestedContext(), values);
        },
    };
};
