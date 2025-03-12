import { D_SIZE_VALUE, P_SIZE } from '../../../../../constants';
import { SIZE_ABSOLUTE_UNITS, SIZE_FALLBACK_LITERAL } from '../../../../../primitives';
import type { SizeValueDefinition } from '../../../../base';

export const VALUE_NAME = D_SIZE_VALUE;

export const SIZE_DEFINITION: SizeValueDefinition = {
    valueName: D_SIZE_VALUE,
    primitiveName: P_SIZE,
    validUnits: SIZE_ABSOLUTE_UNITS,
    defaultUnit: SIZE_FALLBACK_LITERAL.unit,
    base: 0,
    quantize: 0.01,
    fallback: SIZE_FALLBACK_LITERAL.value,
    decisionTypes: {},
};
