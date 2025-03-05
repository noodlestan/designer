import type {
    FontSize,
    FontWeight,
    LineHeight,
    NumberFormatOptions,
    Typeface,
} from '../../../primitives';
import type { BaseValue } from '../../base';

export type TypefaceValue = BaseValue<Typeface>;

export type FontSizeValue = BaseValue<FontSize>;

export type FontWeightValueOptions = NumberFormatOptions;
export type FontWeightValue = BaseValue<FontWeight>;

export type LineHeightValue = BaseValue<LineHeight>;
