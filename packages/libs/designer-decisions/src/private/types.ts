export type DeepPartial<T> = {
    [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};

export type Optional<T, K extends keyof T> = Omit<T, K> &
    Required<Omit<T, K>> &
    Partial<Pick<T, K>>;
