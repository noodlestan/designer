import type { SizeScaleBoundedInput } from '../../../inputs';
import { generateBoundedSeries } from '../../../primitives';
import { type SizeScale, createSizeScale, createSizeValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createSizeScaleBoundedModel: DecisionModelFactory<
    SizeScale,
    SizeScaleBoundedInput
> = () => {
    return {
        produce: context => {
            const { from, to, steps, quantize } = context.params() || {};

            const options = { quantize };
            const fromValue = createSizeValue(context.valueContext(from), options);
            const toValue = createSizeValue(context.valueContext(to), options);

            const series = generateBoundedSeries(
                fromValue.get().toNumber(),
                toValue.get().toNumber(),
                steps,
            );

            const { unit } = fromValue.get();
            const values = series.map(item =>
                createSizeValue(context.valueContext({ value: item, unit }), options),
            );

            return createSizeScale(context.valueContext(values));
        },
    };
};
