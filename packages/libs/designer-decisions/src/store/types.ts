import type { DecisionInput } from '../types';
import type { DecisionError } from '../types/decision-inputs/validation/types';

export type DecisionStoreStatic = {
    hasErrors: () => boolean;
    allErrors: () => DecisionError[] | null;
    records: (filter?: (item: DecisionInput) => boolean) => DecisionInput[];
};
