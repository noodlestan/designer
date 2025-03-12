import type { TextStyleAttributesLiteral, TextStyleObjectInput } from '../../../inputs';
import type {
    FontFamily,
    FontSize,
    FontWeight,
    LetterSpacing,
    LineHeight,
    NumberFormatOptions,
    Typeface,
} from '../../../primitives';
import type { BaseValue } from '../../base';

export type TypefaceValue = BaseValue<Typeface>;

export type FontFamilyValue = BaseValue<FontFamily>;

export type FontSizeValue = BaseValue<FontSize>;

export type FontWeightValueOptions = NumberFormatOptions;
export type FontWeightValue = BaseValue<FontWeight>;

export type LineHeightValue = BaseValue<LineHeight>;

export type LetterSpacingValue = BaseValue<LetterSpacing>;

export type TextStyleComposite = {
    fontFamily?: FontFamilyValue;
    fontSize?: FontSizeValue;
    fontWeight?: FontWeightValue;
    lineHeight?: LineHeightValue;
    letterSpacing?: LetterSpacingValue;
} & TextStyleAttributesLiteral & {
        literal: () => TextStyleObjectInput;
        toString: () => string;
    };

export type TextStyleValue = BaseValue<TextStyleComposite>;
