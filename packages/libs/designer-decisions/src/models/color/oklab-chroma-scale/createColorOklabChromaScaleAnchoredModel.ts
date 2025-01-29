import {
    createOklabChromaScale,
    createOklabChromaValue,
    generateAnchoredSeries,
} from '../../../primitives';
import type {
    ColorOklabChromaScaleAnchoredInput,
    DecisionModelFactory,
    OklabChromaScale,
} from '../../../types';

export const createColorOklabChromaScaleAnchoredModel: DecisionModelFactory<
    OklabChromaScale,
    ColorOklabChromaScaleAnchoredInput
> = () => {
    return {
        produce: (context, params) => {
            const anchorValue = createOklabChromaValue(context.nestedContext(), params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(item =>
                createOklabChromaValue(context.nestedContext(), item),
            );
            return createOklabChromaScale(context, values);
        },
    };
};
