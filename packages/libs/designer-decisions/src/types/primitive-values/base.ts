export type BaseValue<T> = {
    get(): T;
};

export type SetItems<T> = {
    items(): T[];
    item(index: number): T | undefined;
};

export type BaseSet<T> = BaseValue<SetItems<T>>;
