import { isLookupContext } from '../context';
import type {
    DecisionContext,
    InputRecord,
    LookupContexts,
    ParentValueContext,
    ValueContext,
} from '../types';

import { createValueContextPrivate, resolveLookupContext } from './functions';

export const createValueContext = (
    decisionContext: DecisionContext,
    context?: LookupContexts | ParentValueContext,
    input?: InputRecord,
): ValueContext => {
    const lookupContexts = resolveLookupContext(context);
    const parent = isLookupContext(context) ? undefined : context;
    if (parent) {
        return parent.childContext(input);
    }

    return createValueContextPrivate(decisionContext, lookupContexts, input);
};
