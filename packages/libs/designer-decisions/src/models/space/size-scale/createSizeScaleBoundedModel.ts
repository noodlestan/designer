import type { SizeScaleBoundedInput } from '../../../inputs';
import {
    type SizeScale,
    createSizeScale,
    createSizeValue,
    generateBoundedSeries,
} from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createSizeScaleBoundedModel: DecisionModelFactory<
    SizeScale,
    SizeScaleBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const fromValue = createSizeValue(context.nestedContext(), params.from, { quantize });
            const toValue = createSizeValue(context.nestedContext(), params.to, { quantize });

            const { value: from } = fromValue.toObject();
            const { value: to } = toValue.toObject();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series
                .slice(1, series.length - 1)
                .map(item => createSizeValue(context.nestedContext(), item, { quantize }));

            return createSizeScale(context, [fromValue, ...values, toValue]);
        },
    };
};
