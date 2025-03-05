import type { Decision } from '../decision';
import type { DecisionContext } from '../decision-context';
import type { LookupContexts } from '../lookup';
import { type ParentValueContext, createValueContext, createValueInputError } from '../value';
import { type BaseValue, createBaseValue } from '../values';

import { getDecisionModelFactory } from './getDecisionModelFactory';

export const createDecision = <T = unknown>(
    decisionContext: DecisionContext,
): Decision<BaseValue<T>> => {
    const inputZero = () => decisionContext.inputs()[0];

    const produce = (context?: LookupContexts | ParentValueContext): BaseValue<T> => {
        const input = inputZero(); // WIP match context
        const valueContext = createValueContext(decisionContext, input, context);
        try {
            const modelFactory = getDecisionModelFactory<T>(input?.model);
            const model = modelFactory();
            return model.produce(valueContext) as BaseValue<T>;
        } catch (error) {
            valueContext.addError(
                createValueInputError({
                    context: valueContext,
                    valueName: 'unknown',
                    input,
                    error,
                }),
            );
            const empty = undefined as T;
            return createBaseValue(valueContext, () => empty);
        }
    };

    const api: Decision<BaseValue<T>> = {
        context: () => decisionContext,
        uuid: () => inputZero()?.uuid || '<not-found>',
        type: () => decisionContext.decisionType(),
        name: () => inputZero()?.name || '<not-found>',
        description: () => inputZero()?.description,
        inputs: () => decisionContext.inputs(),
        model: () => inputZero()?.model, // WIP match context
        params: () => inputZero()?.params, // WIP match context
        produce,
    };

    return api;
};
