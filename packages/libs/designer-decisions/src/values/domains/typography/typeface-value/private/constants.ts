import { DECISION_TYPEFACE_VALUE } from '../../../../../constants';
import type { Typeface } from '../../types';

export const VALUE_NAME = DECISION_TYPEFACE_VALUE;
export const FALLBACK_VALUE: Typeface = {
    fontName: 'serif',
    capabilities: [],
    styles: [],
    ranges: [],
};
export const REF_CHECKED_TYPES = [DECISION_TYPEFACE_VALUE];

export const CAPABILITIES = 'variable';
