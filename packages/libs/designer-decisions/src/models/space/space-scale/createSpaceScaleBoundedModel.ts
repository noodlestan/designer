import { createSpaceScale, createSpaceValue, generateBoundedSeries } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleLinearBounded } from '../../../types';

export const createSpaceScaleBoundedModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleLinearBounded
> = () => {
    return {
        produce: (context, params) => {
            const fromValue = createSpaceValue(context.nestedContext(), params.from);
            const toValue = createSpaceValue(context.nestedContext(), params.to);

            const { value: from } = fromValue.getValueWithUnits();
            const { value: to } = toValue.getValueWithUnits();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item => createSpaceValue(context.nestedContext(), item));
            return createSpaceScale(context, [fromValue, ...values, toValue]);
        },
    };
};
