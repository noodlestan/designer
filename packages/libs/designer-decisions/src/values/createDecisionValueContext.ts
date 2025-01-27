import { isLookupContext } from '../context';
import type {
    DecisionContext,
    DecisionValueContext,
    InputRecord,
    LookupContexts,
    ParentValueContext,
} from '../types';

import { createValueContext, resolveLookupContext } from './functions';

export const createDecisionValueContext = (
    decisionContext: DecisionContext,
    context?: LookupContexts | ParentValueContext,
    input?: InputRecord,
): DecisionValueContext => {
    const lookupContexts = resolveLookupContext(context);
    const parent = isLookupContext(context) ? undefined : context;
    if (parent) {
        return parent.childContext(input);
    }

    return createValueContext(decisionContext, lookupContexts, input);
};
