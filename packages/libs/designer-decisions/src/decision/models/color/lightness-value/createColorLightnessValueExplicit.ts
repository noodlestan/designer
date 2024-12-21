import { createLightnessValue } from '../../../../primitives';
import {
    type ColorLightnessValueExplicitInput,
    type DecisionModelFactory,
    type LightnessValue,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorLightnessValueExplicit: DecisionModelFactory<
    LightnessValue,
    ColorLightnessValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => createLightnessValue(valueContext, params.value);

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
