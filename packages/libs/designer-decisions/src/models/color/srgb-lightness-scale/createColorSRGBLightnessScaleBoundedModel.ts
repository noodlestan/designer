import type { ColorSRGBLightnessScaleBoundedInput } from '../../../inputs';
import { generateBoundedSeries } from '../../../primitives';
import {
    type SRGBLightnessScale,
    createSRGBLightnessScale,
    createSRGBLightnessValue,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createColorSRGBLightnessScaleBoundedModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleBoundedInput
> = () => {
    return {
        produce: context => {
            const { from, to, steps, quantize } = context.params() || {};

            const options = { quantize };
            const fromValue = createSRGBLightnessValue(context.valueContext(from), options);
            const toValue = createSRGBLightnessValue(context.valueContext(to), options);

            const series = generateBoundedSeries(
                fromValue.get().toNumber(),
                toValue.get().toNumber(),
                steps,
            );
            const values = series.map(channel =>
                createSRGBLightnessValue(context.valueContext(channel), options),
            );

            return createSRGBLightnessScale(context.valueContext(values));
        },
    };
};
