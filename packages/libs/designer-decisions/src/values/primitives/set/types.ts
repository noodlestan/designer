import type { BaseValue } from '..';

export type SetItems<T> = {
    items(): T[];
    item(index: number): T | undefined;
    first(): T | undefined;
    last(): T | undefined;
};

export type BaseSet<T> = BaseValue<SetItems<T>>;
