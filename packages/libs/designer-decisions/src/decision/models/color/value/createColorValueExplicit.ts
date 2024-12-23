import { createColorValue } from '../../../../primitives';
import {
    type ColorValue,
    type ColorValueExplicitInput,
    type DecisionModelFactory,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorValueExplicit: DecisionModelFactory<
    ColorValue,
    ColorValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => createColorValue(valueContext, params.value);

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
