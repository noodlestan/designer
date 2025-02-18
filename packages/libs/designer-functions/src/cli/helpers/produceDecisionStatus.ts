import { type InputRecord, createLookupContexts } from '@noodlestan/designer-decisions';

import type { Store } from '../../store';

import type { ProducedDecisionStatus } from './types';

export const produceDecisionStatus = (store: Store, input: InputRecord): ProducedDecisionStatus => {
    const contexts = createLookupContexts(input.contexts);
    const [context, decision] = store.decision({ $name: input.name }, contexts);

    const uuid = decision?.uuid() || context.inputs()[0].uuid;
    const name = decision?.name() || context.inputs()[0].name; // WIP expose
    const model = decision?.model() || context.inputs()[0].model; // WIP expose
    const value = decision?.produce();

    const hasErrors = Boolean(context.hasErrors() || value?.context().hasErrors());

    return { uuid, name, model, hasErrors, input, context, value };
};
