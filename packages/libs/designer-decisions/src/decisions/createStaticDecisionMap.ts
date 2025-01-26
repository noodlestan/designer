import type { StaticDecisionMap, StaticInputMap } from '../inputs';
import type {
    BaseValue,
    Decision,
    DecisionContext,
    DecisionInputBase,
    DecisionRef,
} from '../types';

import { createDecisionContext } from './createDecisionContext';
import { createStaticStoreDecision } from './createStaticStoreDecision';
import { createInputNotFoundError, createUnexpectedError } from './errors';

export const createStaticDecisionMap = (inputStore: StaticInputMap): StaticDecisionMap => {
    const _createDecision = (context: DecisionContext, inputs: DecisionInputBase[]) => {
        try {
            return createStaticStoreDecision(context, inputs);
        } catch (error) {
            const err = createUnexpectedError(context, error);
            context.addError(err);
        }
    };

    const resolver = <V extends BaseValue<unknown>>(
        ref: DecisionRef,
    ): [DecisionContext, Decision<V> | undefined] => {
        const inputs = inputStore.records(r => '$name' in ref && r.name === ref.$name); // WIP ref matching
        if (inputs.length) {
            const context = createDecisionContext(ref, resolver, inputs);
            const decision = _createDecision(context, inputs);
            return [context, decision as Decision<V>];
        }
        const context = createDecisionContext(ref, resolver, []);
        const error = createInputNotFoundError(context, ref);
        context.addError(error);
        return [context, undefined];
    };

    return {
        resolve: resolver,
    };
};
