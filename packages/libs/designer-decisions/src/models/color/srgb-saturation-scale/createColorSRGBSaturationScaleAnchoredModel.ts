import type { ColorSRGBSaturationScaleAnchoredInput } from '../../../inputs';
import { generateAnchoredSeries } from '../../../primitives';
import {
    type SRGBSaturationScale,
    createSRGBSaturationScale,
    createSRGBSaturationValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBSaturationScaleAnchoredModel: DecisionModelFactory<
    SRGBSaturationScale,
    ColorSRGBSaturationScaleAnchoredInput
> = () => {
    return {
        produce: context => {
            const { anchor, before, after, quantize } = context.params() || {};

            const options = { quantize };
            const { value: anchorValue } = createSRGBSaturationValue(
                context.valueContext(anchor),
                options,
            ).get();

            const seriesParams = { before, after, quantize };
            const series = generateAnchoredSeries(anchorValue, seriesParams);
            const values = series.map(channel =>
                createSRGBSaturationValue(context.valueContext(channel), options),
            );

            return createSRGBSaturationScale(context.valueContext(values));
        },
    };
};
