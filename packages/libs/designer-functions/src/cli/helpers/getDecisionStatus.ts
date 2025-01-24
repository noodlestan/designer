import {
    type DecisionInputBase,
    type DecisionUnknown,
    createLookupContext,
} from '@noodlestan/designer-decisions';

import type { StaticDecisionStore } from '../../store';

import type { DecisionStatus } from './types';

const extractValue = (decision?: DecisionUnknown) => {
    const value = decision?.produce();
    if (
        typeof value === 'object' &&
        value !== null &&
        'get' in value &&
        typeof value.get === 'function'
    ) {
        return value.get();
    }
};

export const getDecisionStatus = (
    store: StaticDecisionStore,
    record: DecisionInputBase,
): DecisionStatus => {
    const contexts = createLookupContext(record.contexts);
    const [context, decision] = store.decision({ $name: record.name }, contexts);

    const uuid = decision?.uuid() || context.inputs()[0].uuid;
    const name = decision?.name() || context.inputs()[0].name; // WIP expose
    const model = decision?.model() || context.inputs()[0].model; // WIP expose
    const value = extractValue(decision);

    const hasErrors = context.hasErrors();
    const errors = context.errors();

    return { uuid, name, model, hasErrors, value, errors };
};
