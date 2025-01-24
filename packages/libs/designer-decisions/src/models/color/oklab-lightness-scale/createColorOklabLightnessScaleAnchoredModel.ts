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
        produce: (context, params) => {
            const anchorValue = createOklabLightnessValue(context.nestedContext(), params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 1]);
            const values = series.map(item =>
                createOklabLightnessValue(context.nestedContext(), item),
            );
            return createOklabLightnessScale(context.nestedContext(), values);
        },
    };
};
