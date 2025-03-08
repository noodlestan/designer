import type { Decision } from '../decision';
import type { DecisionContext } from '../decision-context';
import type { LookupContexts } from '../lookup';
import { type ParentValueContext, createModelContext } from '../value';
import { type BaseValue } from '../values';

import { getDecisionModelFactory } from './getDecisionModelFactory';

export const createDecision = <T extends object = object>(
    decisionContext: DecisionContext,
): Decision<BaseValue<T>> => {
    const inputZero = () => decisionContext.records()[0].input;

    const produce = (context?: LookupContexts | ParentValueContext): BaseValue<T> => {
        const input = inputZero(); // WIP match context
        const modelContext = createModelContext(decisionContext, input, context);
        const modelFactory = getDecisionModelFactory<T>(input?.model);
        const model = modelFactory();
        return model.produce(modelContext) as BaseValue<T>;
    };

    const api: Decision<BaseValue<T>> = {
        context: () => decisionContext,
        uuid: () => inputZero()?.uuid || '<not-found>',
        type: () => decisionContext.decisionType(),
        name: () => inputZero()?.name || '<not-found>',
        description: () => inputZero()?.description,
        records: () => decisionContext.records(),
        model: () => inputZero()?.model, // WIP match context
        params: () => inputZero()?.params, // WIP match context
        produce,
    };

    return api;
};
