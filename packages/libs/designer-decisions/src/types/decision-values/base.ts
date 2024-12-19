export type Value = unknown;

export type Token<T extends Value> = {
    decision: () => DecisionBase<T>;
};

export type DecisionBase<T extends Value> = {
    value: () => T;
    token: () => Token<T>;
};
