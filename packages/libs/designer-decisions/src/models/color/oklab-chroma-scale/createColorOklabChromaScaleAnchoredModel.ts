import type { ColorOklabChromaScaleAnchoredInput } from '../../../inputs';
import { generateAnchoredSeries } from '../../../primitives';
import {
    type OklabChromaScale,
    createOklabChromaScale,
    createOklabChromaValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorOklabChromaScaleAnchoredModel: DecisionModelFactory<
    OklabChromaScale,
    ColorOklabChromaScaleAnchoredInput
> = () => {
    return {
        produce: context => {
            const { anchor, before, after, quantize } = context.params() || {};

            const options = { quantize };
            const { value: anchorValue } = createOklabChromaValue(
                context.valueContext(anchor),
                options,
            ).get();

            const seriesParams = { before, after, quantize };
            const series = generateAnchoredSeries(anchorValue, seriesParams);
            const values = series.map(channel =>
                createOklabChromaValue(context.valueContext(channel), options),
            );

            return createOklabChromaScale(context.valueContext(values));
        },
    };
};
