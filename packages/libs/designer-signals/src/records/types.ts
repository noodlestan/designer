import type { DecisionInput, RecordMap } from '@noodlestan/designer-decisions';

export type ReactiveMap = RecordMap & {
    insertRecord: (input: DecisionInput) => void;
    updateRecord: (uuid: string, input: DecisionInput) => void;
};
