import type { ColorSRGBHueSetAnchoredInput } from '../../../inputs';
import { generateAnchoredSeries } from '../../../primitives';
import { type SRGBHueSet, createSRGBHueSet, createSRGBHueValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBHueSetAnchoredModel: DecisionModelFactory<
    SRGBHueSet,
    ColorSRGBHueSetAnchoredInput
> = () => {
    return {
        produce: context => {
            const { anchor, before, after, quantize } = context.params() || {};

            const options = { quantize };
            const { value: anchorValue } = createSRGBHueValue(context.forValue(anchor), options);

            const seriesParams = { before, after, quantize };
            const series = generateAnchoredSeries(anchorValue, seriesParams);
            const values = series.map(channel =>
                createSRGBHueValue(context.forValue(channel), options),
            );

            return createSRGBHueSet(context.forValue(values));
        },
    };
};
