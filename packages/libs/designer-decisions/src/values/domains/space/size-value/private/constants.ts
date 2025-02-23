import { DECISION_SIZE_SCALE, DECISION_SIZE_VALUE } from '../../../../../constants';
import type { SizeObjectLiteral } from '../../../../../inputs';

export const VALUE_NAME = DECISION_SIZE_VALUE;
export const FALLBACK_VALUE: SizeObjectLiteral = { value: 0, units: 'px' };
export const REF_CHECKED_TYPES = [DECISION_SIZE_VALUE, DECISION_SIZE_SCALE];
