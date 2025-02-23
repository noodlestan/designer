import { DECISION_FONT_SIZE_VALUE } from '../../../../../constants';
import type { SizeDefinition } from '../../../../base';
import { FONT_SIZE_QUANTIZE, createSize } from '../../../../primitives';

export const VALUE_NAME = DECISION_FONT_SIZE_VALUE;
export const FALLBACK_VALUE = createSize({ value: 16, units: 'px' });

export const SIZE_DEFINITION: SizeDefinition = {
    valueName: DECISION_FONT_SIZE_VALUE,
    quant: FONT_SIZE_QUANTIZE,
    fallback: FALLBACK_VALUE,
    decisionTypes: {
        value: DECISION_FONT_SIZE_VALUE,
    },
};
