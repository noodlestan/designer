import type { DecisionContext, DecisionValueContext } from '../types';

import { createValueContext } from './functions';

export const createDecisionValueContext = (
    decisionContext: DecisionContext,
): DecisionValueContext => {
    return createValueContext(decisionContext);
};
