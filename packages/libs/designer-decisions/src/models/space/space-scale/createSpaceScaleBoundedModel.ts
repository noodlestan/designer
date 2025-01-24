import { createSpaceScale, createSpaceValue, generateBoundedSeries } from '../../../primitives';
import type { DecisionModelFactory, SpaceScale, SpaceScaleLinearBounded } from '../../../types';

export const createSpaceScaleBoundedModel: DecisionModelFactory<
    SpaceScale,
    SpaceScaleLinearBounded
> = () => {
    return {
        produce: (valueContext, params) => {
            const fromValue = createSpaceValue(valueContext, params.from);
            const toValue = createSpaceValue(valueContext, params.to);

            const { value: from } = fromValue.getValueWithUnits();
            const { value: to } = toValue.getValueWithUnits();

            const series = generateBoundedSeries(from, to, params.steps);
            const values = series.map(item => createSpaceValue(valueContext, item));
            return createSpaceScale(valueContext, [fromValue, ...values, toValue]);
        },
    };
};
