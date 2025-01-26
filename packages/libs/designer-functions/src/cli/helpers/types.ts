import type {
    BaseValue,
    DecisionContext,
    DecisionError,
    DecisionInputBase,
    DecisionInputError,
    DecisionValueError,
} from '@noodlestan/designer-decisions';

import type { StaticDecisionStoreError } from '../../store';

export type ProducedDecisionStatus = {
    uuid?: string;
    name: string;
    model: string;
    hasErrors: boolean;
    input: DecisionInputBase;
    context: DecisionContext;
    value?: BaseValue<unknown>;
};

export type ProducedDecisionStore = {
    decisions: () => ProducedDecisionStatus[];
    hasErrors: () => boolean;
    errors: {
        count: () => number;
        store: () => StaticDecisionStoreError[];
        validation: () => DecisionInputError[];
        value: () => (DecisionError | DecisionValueError)[];
    };
    summary: () => string;
};
