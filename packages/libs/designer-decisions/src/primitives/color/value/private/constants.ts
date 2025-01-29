import { DECISION_COLOR_SET, DECISION_COLOR_VALUE } from '../../../../constants';
import { createColor } from '../../helpers';

export const VALUE_NAME = 'ColorValue';
export const FALLBACK_VALUE = createColor('#000000');
export const REF_CHECKED_TYPES = [DECISION_COLOR_VALUE, DECISION_COLOR_SET];
