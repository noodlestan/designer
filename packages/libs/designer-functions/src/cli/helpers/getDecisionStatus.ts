import {
    type Decision,
    type DecisionInputBase,
    createLookupContexts,
} from '@noodlestan/designer-decisions';

import type { StaticDecisionStore } from '../../store';

import type { DecisionStatus } from './types';

const extractValue = (decision?: Decision<unknown>) => {
    const value = decision?.produce().value();
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
    const contexts = createLookupContexts(record.contexts);
    const [context, decision] = store.decision({ $name: record.name }, contexts);

    const uuid = decision?.input().uuid || context.owner().uuid;
    const name = decision?.input().name || context.owner().name;
    const model = decision?.input().model || context.owner().model;
    const value = extractValue(decision);

    const hasErrors = context.hasErrors();
    const errors = context.errors();

    return { uuid, name, model, hasErrors, value, errors };
};
