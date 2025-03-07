import { type DecisionInput, type Store } from '@noodlestan/designer-decisions';

import { tryProduceDecisionStatus } from './functions';
import type { ProducedDecisionStatus } from './types';

export const produceDecisionStatus = (
    store: Store,
    input: DecisionInput,
): ProducedDecisionStatus => {
    // const contexts = createLookupContexts(input.contexts);
    const decision = store.decision({ $name: input.name });
    const context = decision.context();

    const uuid = decision.uuid();
    const name = decision.name();
    const model = decision.model();
    const value = decision && tryProduceDecisionStatus(context, decision);

    const hasDecisionErrors = Boolean(context.hasErrors());
    const hasValueErrors = Boolean(value?.context().hasErrors());

    const hasErrors = Boolean(hasDecisionErrors || hasValueErrors);

    return {
        uuid,
        name,
        model,
        hasErrors,
        hasDecisionErrors,
        hasValueErrors,
        input,
        context,
        value,
    };
};
