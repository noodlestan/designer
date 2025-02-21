import type { ValueContext } from '../../../value';

export type BaseValueAbstract = {
    context(): ValueContext;
};

export type BaseValue<T> = BaseValueAbstract & {
    get(): T;
};
