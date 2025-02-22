import type { BaseValue } from '../../base/value';

export type NumberValueOptions = {
    quantize?: number;
};

export type BaseNumericValue<T extends number = number> = BaseValue<T> & {
    raw(): T;
    quantized: (quantize?: number) => T;
};

export type AbstractNumericValue = Omit<BaseNumericValue, 'context'>;
