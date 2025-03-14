import { D_FONT_SIZE_VALUE, P_FONT_SIZE } from '../../../../../constants';
import {
    FONT_SIZE_FALLBACK_LITERAL,
    FONT_SIZE_QUANTIZE,
    SIZE_ABSOLUTE_UNITS,
} from '../../../../../primitives';
import type { SizeValueDefinition } from '../../../../base';

export const SIZE_VALUE_DEFINITION: SizeValueDefinition = {
    valueName: D_FONT_SIZE_VALUE,
    primitiveName: P_FONT_SIZE,
    validUnits: SIZE_ABSOLUTE_UNITS,
    defaultUnit: FONT_SIZE_FALLBACK_LITERAL.unit,
    base: 1,
    quantize: FONT_SIZE_QUANTIZE,
    fallback: FONT_SIZE_FALLBACK_LITERAL.value,
    decisionTypes: {
        value: D_FONT_SIZE_VALUE,
    },
};
