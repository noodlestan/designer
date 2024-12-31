export type BaseValue<T> = {
    get(): T;
};

export type BaseSet<T> = {
    get(): T[];
};
