import { createSRGBHueSet, createSRGBHueValue, generateAnchoredSeries } from '../../../primitives';
import type {
    ColorSRGBHueSetAnchoredInput,
    DecisionModelFactory,
    SRGBHueSet,
} from '../../../types';

export const createColorSRGBHueSetAnchoredModel: DecisionModelFactory<
    SRGBHueSet,
    ColorSRGBHueSetAnchoredInput
> = () => {
    return {
        produce: (context, params) => {
            const anchorValue = createSRGBHueValue(context.nestedContext(), params.anchor);
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params, [0, 360]);
            const values = series.map(item => createSRGBHueValue(context.nestedContext(), item));
            return createSRGBHueSet(context, values);
        },
    };
};
