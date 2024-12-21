import { createHueValue } from '../../../../primitives';
import {
    type ColorHueValueExplicitInput,
    type DecisionModelFactory,
    type HueValue,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorHueValueExplicit: DecisionModelFactory<
    HueValue,
    ColorHueValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => createHueValue(valueContext, params.value);

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
