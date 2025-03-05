import type { Decision } from '../decision';
import { createDecisionContext } from '../decision-context';
import type { DecisionInput, DecisionRef } from '../inputs';
import type { LookupContexts } from '../lookup';
import type { RecordMap, ValidatedRecord } from '../records';
import { createValueContext } from '../value';
import type { BaseValue } from '../values';

import { createResolver } from './private';
import type { Store } from './types';

export const createStore = (validatedMap: RecordMap): Store => {
    const resolver = createResolver(validatedMap);

    const decision = <V extends BaseValue<unknown> = BaseValue<unknown>>(
        ref: DecisionRef,
    ): Decision<V> => {
        return resolver.resolve(ref);
    };

    const _createDecisionContext = (records: ValidatedRecord[] = []) => {
        return createDecisionContext({ $name: '<unknown>' }, resolver.resolve, records); // WIP
    };

    const _createValueContext = (lookupContexts?: LookupContexts) => {
        const decisionContext = _createDecisionContext();
        const input: DecisionInput = { model: '', name: '', params: {} };
        return createValueContext(decisionContext, input, lookupContexts);
    };

    return {
        inputErrors: validatedMap.inputErrors,
        records: validatedMap.records,
        decision,
        createDecisionContext: _createDecisionContext,
        createValueContext: _createValueContext,
    };
};
