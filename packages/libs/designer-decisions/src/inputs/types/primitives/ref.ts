import type { DecisionId, DecisionName } from '../record';

export type DecisionNameRef = {
    $name: DecisionName;
    index?: number;
};

export type DecisionUuidRef = {
    $uuid: DecisionId;
    index?: number;
};

export type DecisionRef = DecisionNameRef | DecisionUuidRef;
