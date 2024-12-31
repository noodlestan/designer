import type { DecisionError } from '@noodlestan/designer-decisions';

export type DecisionStatus = {
    uuid?: string;
    name: string;
    model: string;
    value: unknown;
    hasErrors: boolean;
    errors: DecisionError[];
};
