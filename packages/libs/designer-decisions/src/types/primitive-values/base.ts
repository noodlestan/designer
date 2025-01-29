import type { ValueContext } from '../decision-values';

export type BaseValueAbstract = {
    context(): ValueContext;
};

export type BaseValue<T> = BaseValueAbstract & {
    get(): T;
};

export type SetItems<T> = {
    items(): T[];
    item(index: number): T | undefined;
    first(): T | undefined;
    last(): T | undefined;
};

export type BaseSet<T> = BaseValue<SetItems<T>>;
