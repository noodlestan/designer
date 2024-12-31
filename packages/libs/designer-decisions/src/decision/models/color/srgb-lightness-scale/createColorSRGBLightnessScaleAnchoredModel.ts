import {
    createSRGBLightnessScale,
    createSRGBLightnessValue,
    createSteppedNumberSeries,
} from '../../../../primitives';
import type {
    ColorSRGBLightnessScaleAnchoredInput,
    DecisionModelFactory,
    SRGBLightnessScale,
} from '../../../../types';
import { createDecisionValue } from '../../../values';

export const createColorSRGBLightnessScaleAnchoredModel: DecisionModelFactory<
    SRGBLightnessScale,
    ColorSRGBLightnessScaleAnchoredInput
> = () => {
    return {
        produce: (valueContext, params) => {
            const resolveValue = () => {
                const startValue = createSRGBLightnessValue(valueContext, params.anchor);
                const anchor = startValue.get();

                const { before, after } = params;
                const beforeValues = before
                    ? createSteppedNumberSeries(anchor, before.steps, before.modifier, [0, 1])
                    : [];
                const afterValues = after
                    ? createSteppedNumberSeries(anchor, after.steps, after.modifier, [0, 1])
                    : [];

                return createSRGBLightnessScale(valueContext, [
                    ...beforeValues,
                    anchor,
                    ...afterValues,
                ]);
            };
            return createDecisionValue(valueContext, resolveValue);
        },
    };
};
