import type {
    BaseValue,
    DecisionContext,
    DecisionError,
    DecisionValueError,
    InputRecord,
    InputValidationError,
} from '@noodlestan/designer-decisions';

import type { StaticDecisionStoreError } from '../../store';

export type ProducedDecisionStatus = {
    uuid?: string;
    name: string;
    model: string;
    hasErrors: boolean;
    input: InputRecord;
    context: DecisionContext;
    value?: BaseValue<unknown>;
};

export type ProducedDecisionStore = {
    decisions: () => ProducedDecisionStatus[];
    hasErrors: () => boolean;
    errors: {
        count: () => number;
        store: () => StaticDecisionStoreError[];
        validation: () => InputValidationError[];
        value: () => (DecisionError | DecisionValueError)[];
    };
    summary: () => string;
};
