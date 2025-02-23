import { DECISION_FONT_SIZE_VALUE } from '../../../../constants';
import { FONT_SIZE_QUANTIZE } from '../../../primitives';
import type { SizeDefinition } from '../types';

export const mockSizeDefinition: SizeDefinition = {
    valueName: DECISION_FONT_SIZE_VALUE,
    quant: FONT_SIZE_QUANTIZE,
    fallback: { value: 0, units: 'px' },
    decisionTypes: {
        // set: DECISION_FONT_SIZE_SCALE,
        value: DECISION_FONT_SIZE_VALUE,
    },
};
