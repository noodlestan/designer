import { P_LINE_HEIGHT } from '../../../../constants';
import type { ValueAndUnitDefinition } from '../../../units';
import {
    LINE_HEIGHT_FALLBACK_NUMERIC,
    LINE_HEIGHT_QUANTIZE,
    LINE_HEIGHT_UNITS,
} from '../constants';

export const LINE_HEIGHT_VALUE_AND_UNIT_DEFINITION: ValueAndUnitDefinition = {
    primitiveName: P_LINE_HEIGHT,
    validUnits: LINE_HEIGHT_UNITS,
    defaultUnit: undefined,
    quantize: LINE_HEIGHT_QUANTIZE,
    fallback: LINE_HEIGHT_FALLBACK_NUMERIC,
};
