import type { TextStyleValueExplicitInput } from '../../../inputs';
import { type TextStyleValue, createTextStyleValue } from '../../../values';
import type { DecisionModelFactory } from '../../types';

export const createTextStyleValueExplicitModel: DecisionModelFactory<
    TextStyleValue,
    TextStyleValueExplicitInput
> = () => {
    return {
        produce: context => {
            const { value } = context.params() || {};
            return createTextStyleValue(context.forValue(value));
        },
    };
};
