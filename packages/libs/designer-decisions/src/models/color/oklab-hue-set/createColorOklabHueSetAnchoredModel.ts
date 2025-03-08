import type { ColorOklabHueSetAnchoredInput } from '../../../inputs';
import { generateAnchoredSeries } from '../../../primitives';
import { type OklabHueSet, createOklabHueSet, createOklabHueValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabHueSetAnchoredModel: DecisionModelFactory<
    OklabHueSet,
    ColorOklabHueSetAnchoredInput
> = () => {
    return {
        produce: context => {
            const { anchor, before, after, quantize } = context.params() || {};

            const options = { quantize };
            const { value: anchorValue } = createOklabHueValue(
                context.forValue(anchor),
                options,
            ).get();

            const seriesParams = { before, after, quantize };
            const series = generateAnchoredSeries(anchorValue, seriesParams);
            const values = series.map(channel =>
                createOklabHueValue(context.forValue(channel), options),
            );

            return createOklabHueSet(context.forValue(values));
        },
    };
};
