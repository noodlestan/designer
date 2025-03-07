import type { Decision } from '../decision';
import { createDecisionContext } from '../decision-context';
import { type DecisionRef, createStaticInput } from '../inputs';
import type { LookupContexts } from '../lookup';
import type { RecordMap, ValidatedRecord } from '../record';
import { createModelContext, createValueContext } from '../value';
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

    const _createValueContext = <I = unknown>(input?: I, lookupContexts?: LookupContexts) => {
        const decisionContext = _createDecisionContext();
        const decisionInput = createStaticInput({ params: input });
        const modelContext = createModelContext(decisionContext, decisionInput, lookupContexts);
        return createValueContext(modelContext, input, lookupContexts);
    };

    return {
        inputErrors: validatedMap.inputErrors,
        records: validatedMap.records,
        decision,
        createDecisionContext: _createDecisionContext,
        createValueContext: _createValueContext,
    };
};
