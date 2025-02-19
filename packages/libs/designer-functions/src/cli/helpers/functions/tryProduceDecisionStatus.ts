import {
    type BaseValue,
    type DecisionContext,
    type DecisionUnknown,
    createUnexpectedError,
} from '@noodlestan/designer-decisions';

export function tryProduceDecisionStatus(
    context: DecisionContext,
    decision: DecisionUnknown,
): BaseValue<unknown> | undefined {
    try {
        return decision?.produce();
    } catch (error) {
        const err = createUnexpectedError({ context, error });
        context.addError(err);
    }
}
