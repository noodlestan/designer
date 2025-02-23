export type FontWeight = {
    value: number;
    named: () => string | undefined;
    toString: () => string;
};
