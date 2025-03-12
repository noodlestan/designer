import { D_TYPEFACE_VALUE } from '../../constants';
import type { Decision, DecisionUnknown } from '../../decision';
import type { TypefaceValue } from '../../values';

export const isTypefaceValue = (decision: DecisionUnknown): decision is Decision<TypefaceValue> => {
    return decision.type() === D_TYPEFACE_VALUE;
};
