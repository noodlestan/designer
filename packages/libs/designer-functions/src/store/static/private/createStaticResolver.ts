import {
    type BaseValue,
    type Decision,
    type DecisionContext,
    type DecisionRef,
    type StaticResolver,
    type StaticValidatedMap,
    createDecisionContext,
    createDecisionNotFoundError,
    createStaticDecision,
    createUnexpectedError,
} from '@noodlestan/designer-decisions';

export const createStaticResolver = (validatedMap: StaticValidatedMap): StaticResolver => {
    const _createDecision = (context: DecisionContext) => {
        try {
            return createStaticDecision(context);
        } catch (error) {
            const err = createUnexpectedError({ context, error });
            context.addError(err);
        }
    };

    const resolver = <V extends BaseValue<unknown>>(
        ref: DecisionRef,
    ): [DecisionContext, Decision<V> | undefined] => {
        const records = validatedMap.findByRef(ref);

        if (records.length) {
            const context = createDecisionContext(ref, resolver, records);
            const decision = _createDecision(context);
            return [context, decision as Decision<V>];
        }
        const context = createDecisionContext(ref, resolver, []);
        const error = createDecisionNotFoundError({ context, ref });
        context.addError(error);
        return [context, undefined];
    };

    return {
        resolve: resolver,
    };
};
