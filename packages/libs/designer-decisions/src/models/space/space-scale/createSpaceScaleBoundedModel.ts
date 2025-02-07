import { createSpaceScale, createSpaceValue, generateBoundedSeries } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleBoundedInput } from '../../../types';

export const createSpaceScaleBoundedModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleBoundedInput
> = () => {
    return {
        produce: (context, params) => {
            const { quantize } = params;

            const fromValue = createSpaceValue(context.nestedContext(), params.from, { quantize });
            const toValue = createSpaceValue(context.nestedContext(), params.to, { quantize });

            const { value: from } = fromValue.getObject();
            const { value: to } = toValue.getObject();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series
                .slice(1, series.length - 1)
                .map(item => createSpaceValue(context.nestedContext(), item, { quantize }));

            return createSpaceScale(context, [fromValue, ...values, toValue]);
        },
    };
};
