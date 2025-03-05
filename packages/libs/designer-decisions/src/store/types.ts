import type { DecisionContext, DecisionRefResolver } from '../decision-context';
import type { LookupContexts } from '../lookup';
import type { RecordMap, ValidatedRecord } from '../records';
import type { ValueContext } from '../value';

export type StaticResolver = {
    resolve: DecisionRefResolver;
};

export type Store = {
    inputErrors: RecordMap['inputErrors'];
    records: RecordMap['records'];
    decision: DecisionRefResolver;
    createDecisionContext: (
        records?: ValidatedRecord[],
        contexts?: LookupContexts,
    ) => DecisionContext;
    createValueContext: (lookupContexts?: LookupContexts) => ValueContext;
};
