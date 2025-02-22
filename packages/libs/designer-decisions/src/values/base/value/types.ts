import type { ValueContext } from '../../../value';

export type BaseValue<T> = {
    type: () => string;
    context(): ValueContext;
    get(): T;
};
