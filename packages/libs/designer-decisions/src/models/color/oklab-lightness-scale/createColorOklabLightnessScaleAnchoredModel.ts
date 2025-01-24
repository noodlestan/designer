import {
    createOklabLightnessScale,
    createOklabLightnessValue,
    generateAnchoredSeries,
} from '../../../primitives';
import type {
    ColorOklabLightnessScaleAnchoredInput,
    DecisionModelFactory,
    OklabLightnessScale,
} from '../../../types';

export const createColorOklabLightnessScaleAnchoredModel: DecisionModelFactory<
    OklabLightnessScale,
    ColorOklabLightnessScaleAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const anchorValue = createOklabLightnessValue(valueContext, params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 1]);
            const values = series.map(item => createOklabLightnessValue(valueContext, item));
            return createOklabLightnessScale(valueContext, values);
        },
    };
};
