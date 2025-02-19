import { type DecisionInput } from '@noodlestan/designer-decisions';

import type { Store } from '../../store';

import { tryProduceDecisionStatus } from './functions';
import type { ProducedDecisionStatus } from './types';

export const produceDecisionStatus = (
    store: Store,
    input: DecisionInput,
): ProducedDecisionStatus => {
    // const contexts = createLookupContexts(input.contexts);
    const [context, decision] = store.decision({ $name: input.name });

    const uuid = decision?.uuid() || context.inputs()[0].uuid;
    const name = decision?.name() || context.inputs()[0].name; // WIP expose
    const model = decision?.model() || context.inputs()[0].model; // WIP expose
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
