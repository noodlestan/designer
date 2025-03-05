import type { Decision } from '../../decision';
import { createDecisionContext, createDecisionNotFoundError } from '../../decision-context';
import type { DecisionRef } from '../../inputs';
import type { RecordMap } from '../../records';
import type { BaseValue } from '../../values';
import { createDecision } from '../createDecision';
import type { StaticResolver } from '../types';
export const createResolver = (validatedMap: RecordMap): StaticResolver => {
    const resolver = <V extends BaseValue<unknown>>(ref: DecisionRef): Decision<V> => {
        const records = validatedMap.findByRef(ref);

        const context = createDecisionContext(ref, resolver, records);
        if (!records.length) {
            const error = createDecisionNotFoundError({ context, ref });
            context.addError(error);
        }
        return createDecision(context) as Decision<V>;
    };

    return {
        resolve: resolver,
    };
};
