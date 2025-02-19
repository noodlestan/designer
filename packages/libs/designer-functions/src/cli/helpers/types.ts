import type { BaseValue, DecisionContext, DecisionInput } from '@noodlestan/designer-decisions';

export type ProducedDecisionStatus = {
    uuid?: string;
    name: string;
    model: string;
    hasErrors: boolean;
    hasDecisionErrors: boolean;
    hasValueErrors: boolean;
    input: DecisionInput;
    context: DecisionContext;
    value?: BaseValue<unknown>;
};

export type ProducedDecisionStore = {
    decisions: () => ProducedDecisionStatus[];
    hasErrors: () => boolean;
    summary: () => string;
};
