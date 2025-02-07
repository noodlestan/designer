import {
    createOklabHueSet,
    createOklabHueValue,
    generateAnchoredSeries,
} from '../../../primitives';
import type {
    ColorOklabHueSetAnchoredInput,
    DecisionModelFactory,
    OklabHueSet,
} from '../../../types';

export const createColorOklabHueSetAnchoredModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetAnchoredInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const anchorValue = createOklabHueValue(context.nestedContext(), params.anchor, {
                quantize,
            });
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(item =>
                createOklabHueValue(context.nestedContext(), item, { quantize }),
            );
            return createOklabHueSet(context, values);
        },
    };
};
