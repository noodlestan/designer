export type SetItems<T> = {
    items(): T[];
    item(index: number): T | undefined;
    first(): T | undefined;
    last(): T | undefined;
};
