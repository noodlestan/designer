import type { DecisionContext } from '../decision';
import type { DecisionInput } from '../inputs';
import { type LookupContexts, isLookupContext } from '../lookup';

import { createValueContextPrivate, resolveLookupContext } from './functions';
import type { ParentValueContext, ValueContext } from './types';

export const createValueContext = (
    decisionContext: DecisionContext,
    context?: LookupContexts | ParentValueContext,
    input?: DecisionInput,
): ValueContext => {
    const lookupContexts = resolveLookupContext(context);
    const parent = isLookupContext(context) ? undefined : context;
    if (parent) {
        return parent.childContext(input);
    }

    return createValueContextPrivate(decisionContext, lookupContexts, input);
};
