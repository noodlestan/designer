import { createSaturationValue } from '../../../../primitives';
import {
    type ColorSaturationValueExplicitInput,
    type DecisionModelFactory,
    type SaturationValue,
} from '../../../../types';
import { createDecisionValue } from '../../../value';

export const createColorSaturationValueExplicit: DecisionModelFactory<
    SaturationValue,
    ColorSaturationValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => createSaturationValue(valueContext, params.value);

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
