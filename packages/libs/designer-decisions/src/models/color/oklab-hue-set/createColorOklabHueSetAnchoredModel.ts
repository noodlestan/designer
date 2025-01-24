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
            const anchorValue = createOklabHueValue(context.createChildContext(), params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 360]);
            const values = series.map(item =>
                createOklabHueValue(context.createChildContext(), item),
            );
            return createOklabHueSet(context, values);
        },
    };
};
