import type { ErrorObject } from 'ajv';

import type { Decision, DecisionContext } from '../decisions';
import type { DecisionRef, InputRecord, StaticDecisionMap, StaticInputMap } from '../inputs';
import type { BaseValue } from '../primitives';

import { createDecisionContext } from './createDecisionContext';
import { createStaticDecision } from './createStaticDecision';
import { createInputNotFoundError, createUnexpectedError, createValidationError } from './errors';

export const createStaticDecisionMap = (inputStore: StaticInputMap): StaticDecisionMap => {
    const _createDecision = (context: DecisionContext, inputs: InputRecord[]) => {
        try {
            return createStaticDecision(context, inputs);
        } catch (error) {
            const err = createUnexpectedError({ context, error });
            context.addError(err);
        }
    };

    const resolver = <V extends BaseValue<unknown>>(
        ref: DecisionRef,
    ): [DecisionContext, Decision<V> | undefined] => {
        const record = inputStore.findByRef(ref);

        if (record.length) {
            const inputs = record.flatMap(({ decision }) => decision);
            const context = createDecisionContext(ref, resolver, inputs);

            const errors = record
                .filter(({ errors }) => Boolean(errors))
                .flatMap(({ errors }) => errors) as ErrorObject[];

            errors.forEach(error => context.addError(createValidationError({ error, context })));

            const decision = _createDecision(context, inputs);
            return [context, decision as Decision<V>];
        }
        const context = createDecisionContext(ref, resolver, []);
        const error = createInputNotFoundError({ context, ref });
        context.addError(error);
        return [context, undefined];
    };

    return {
        resolve: resolver,
    };
};
