import {
    D_FONT_FAMILY_VALUE,
    D_FONT_SIZE_VALUE,
    D_FONT_WEIGHT_VALUE,
    D_LETTER_SPACING_VALUE,
    D_LINE_HEIGHT_VALUE,
    D_TEXT_STYLE_VALUE,
    D_TYPEFACE_VALUE,
    type FontFamilyValue,
    type FontSizeValue,
    type FontWeightValue,
    type LetterSpacingValue,
    type LineHeightValue,
    type TextStyleValue,
    type TypefaceValue,
} from '@noodlestan/designer-decisions';

import type { TextStyleVizProps } from '../types';

type TextStyleVizStyles = {
    __fontFamily: string;
    __fontSize: string;
    __fontWeight: number;
    __lineHeight: string;
    __letterSpacing: string;
    __fontStyle: string;
    __textTransform: string;
};

export const resolveTextStyleVizStyles = (
    v?: TextStyleVizProps['v'],
): Partial<TextStyleVizStyles> => {
    const style: Partial<TextStyleVizStyles> = {};

    if (v?.type() === D_TEXT_STYLE_VALUE) {
        const textStyle = v as TextStyleValue;
        style.__fontFamily = textStyle.fontFamily?.toString();
        style.__fontSize = textStyle.fontSize?.toString();
        style.__fontWeight = textStyle.fontWeight?.toNumber();
        style.__lineHeight = textStyle.lineHeight?.toString();
        style.__letterSpacing = textStyle.letterSpacing?.toString();
        style.__fontStyle = textStyle.fontStyle?.toString();
        style.__textTransform = textStyle.textTransform?.toString();
    }

    if (v?.type() === D_TYPEFACE_VALUE) {
        const typeface = v as TypefaceValue;
        style.__fontFamily = typeface.toString();
    }

    if (v?.type() === D_FONT_FAMILY_VALUE) {
        const FontFamily = v as FontFamilyValue;
        style.__fontFamily = FontFamily.toString();
    }

    if (v?.type() === D_FONT_SIZE_VALUE) {
        const fontSize = v as FontSizeValue;
        style.__fontSize = fontSize.toString();
    }

    if (v?.type() === D_FONT_WEIGHT_VALUE) {
        const fontWeight = v as FontWeightValue;
        style.__fontWeight = fontWeight.toNumber();
    }

    if (v?.type() === D_LINE_HEIGHT_VALUE) {
        const lineHeight = v as LineHeightValue;
        style.__lineHeight = lineHeight.toString();
    }

    if (v?.type() === D_LETTER_SPACING_VALUE) {
        const letterSpacing = v as LetterSpacingValue;
        style.__letterSpacing = letterSpacing.toString();
    }

    return style;
};
