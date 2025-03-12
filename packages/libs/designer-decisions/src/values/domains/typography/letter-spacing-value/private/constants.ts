import { D_LETTER_SPACING_VALUE, P_LETTER_SPACING } from '../../../../../constants';
import {
    LETTER_SPACING_BASE,
    LETTER_SPACING_FALLBACK_LITERAL,
    LETTER_SPACING_QUANTIZE,
    SIZE_ABSOLUTE_UNITS,
} from '../../../../../primitives';
import type { SizeValueDefinition } from '../../../../base';

export const SIZE_VALUE_DEFINITION: SizeValueDefinition = {
    valueName: D_LETTER_SPACING_VALUE,
    primitiveName: P_LETTER_SPACING,
    validUnits: SIZE_ABSOLUTE_UNITS,
    defaultUnit: LETTER_SPACING_FALLBACK_LITERAL.unit,
    base: LETTER_SPACING_BASE,
    quantize: LETTER_SPACING_QUANTIZE,
    fallback: LETTER_SPACING_FALLBACK_LITERAL.value,
    decisionTypes: {
        value: D_LETTER_SPACING_VALUE,
    },
};
