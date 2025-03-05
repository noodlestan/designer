import {
    type BaseValue,
    type DecisionContext,
    type DecisionUnknown,
    createDecisionUnexpectedError,
} from '@noodlestan/designer-decisions';

export function tryProduceDecisionStatus(
    context: DecisionContext,
    decision: DecisionUnknown,
): BaseValue<unknown> | undefined {
    try {
        return decision?.produce();
    } catch (error) {
        const err = createDecisionUnexpectedError({ context, error });
        context.addError(err);
    }
}
