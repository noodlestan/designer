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
            const { precision } = params;

            const anchorValue = createOklabHueValue(context.nestedContext(), params.anchor, {
                precision,
            });
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(item =>
                createOklabHueValue(context.nestedContext(), item, { precision }),
            );
            return createOklabHueSet(context, values);
        },
    };
};
