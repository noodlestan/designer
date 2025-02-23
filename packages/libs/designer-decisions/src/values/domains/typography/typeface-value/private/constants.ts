import { DECISION_TYPEFACE_VALUE } from '../../../../../constants';
import { createTypeface } from '../../../../primitives';

export const VALUE_NAME = DECISION_TYPEFACE_VALUE;
export const FALLBACK_VALUE = createTypeface({
    fontName: 'serif',
    capabilities: [],
    styles: [],
    ranges: [],
});

export const REF_CHECKED_TYPES = [DECISION_TYPEFACE_VALUE];

export const CAPABILITIES = 'variable';
