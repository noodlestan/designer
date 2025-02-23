import type { FontWeightInput } from '../../../../inputs';
import type { ValueContext } from '../../../../value';
import { type SizeValueOptions, createBaseValue } from '../../../base';
import { FONT_WEIGHT_QUANTIZE, createFontWeight, createNumericValue } from '../../../primitives';
import type { FontWeightValue } from '../types';

import { resolveFontWeightValue } from './resolveFontWeightValue';

export const createFontWeightValue = (
    context: ValueContext,
    input: FontWeightInput,
    options: SizeValueOptions = {},
): FontWeightValue => {
    const baseValue = createBaseValue(context, input);

    const { quantize = FONT_WEIGHT_QUANTIZE } = options;
    const fontWeight = resolveFontWeightValue(context, input);

    const { get: getValue, raw, quantized } = createNumericValue(fontWeight.value, { quantize });

    return {
        ...baseValue,
        get: () => {
            const v = getValue();
            return v === fontWeight.value ? fontWeight : createFontWeight(v);
        },
        raw,
        quantized,
        toString: ({ quantize: q }: SizeValueOptions = {}) => {
            const v = quantized(q ?? quantize);
            return v === fontWeight.value ? fontWeight.toString() : createFontWeight(v).toString();
        },
    };
};
