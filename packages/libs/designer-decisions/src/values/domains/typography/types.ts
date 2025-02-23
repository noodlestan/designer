import type { BaseValue } from '../../base';
import type { FontSize, FontWeight, NumberValueOptions, Typeface } from '../../primitives';

export type TypefaceValue = BaseValue<Typeface>;

export type FontSizeValue = BaseValue<FontSize>;

export type FontWeightValueOptions = NumberValueOptions;

export type FontWeightValue = BaseValue<FontWeight> & {
    raw(): number;
    quantized: (quantize?: number) => number;
    toString: (options?: FontWeightValueOptions) => string;
};
