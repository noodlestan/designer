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
            const { precision } = params;

            const anchorValue = createOklabLightnessValue(context.nestedContext(), params.anchor, {
                precision,
            });
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(item =>
                createOklabLightnessValue(context.nestedContext(), item, { precision }),
            );
            return createOklabLightnessScale(context.nestedContext(), values);
        },
    };
};
