import type { ValueContext } from '../../../value';

export type BaseValue<T> = {
    context(): ValueContext;
    get(): T;
};
