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
            const { quantize } = params;

            const anchorValue = createSRGBHueValue(context.nestedContext(), params.anchor, {
                quantize,
            });
            const anchor = anchorValue.get();

            const series = generateAnchoredSeries(anchor, params);
            const values = series.map(item =>
                createSRGBHueValue(context.nestedContext(), item, { quantize }),
            );
            return createSRGBHueSet(context, values);
        },
    };
};
