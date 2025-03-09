import type { LineHeightValueExplicitInput } from '../../../inputs';
import { type LineHeightValue, createLineHeightValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createLineHeightValueExplicitModel: DecisionModelFactory<
    LineHeightValue,
    LineHeightValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value } = context.params() || {};
            return createLineHeightValue(context.forValue(value));
        },
    };
};
