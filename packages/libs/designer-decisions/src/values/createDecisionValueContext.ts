import { isLookupContext } from '../context';
import type {
    DecisionContext,
    DecisionInputBase,
    DecisionValueContext,
    LookupContexts,
    ParentValueContext,
} from '../types';

import { createValueContext, resolveLookupContext } from './functions';

export const createDecisionValueContext = (
    decisionContext: DecisionContext,
    context?: LookupContexts | ParentValueContext,
    input?: DecisionInputBase,
): DecisionValueContext => {
    const lookupContexts = resolveLookupContext(context);
    const parent = isLookupContext(context) ? undefined : context;
    if (parent) {
        return parent.createChildContext(input);
    }

    return createValueContext(decisionContext, lookupContexts, input);
};
