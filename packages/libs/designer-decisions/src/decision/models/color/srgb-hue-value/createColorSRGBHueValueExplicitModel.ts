import { createSRGBHueValue } from '../../../../primitives';
import {
    type ColorSRGBHueValueExplicitInput,
    type DecisionModelFactory,
    type SRGBHueValue,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBHueValueExplicitModel: DecisionModelFactory<
    SRGBHueValue,
    ColorSRGBHueValueExplicitInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => createSRGBHueValue(valueContext, params.value);

            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
