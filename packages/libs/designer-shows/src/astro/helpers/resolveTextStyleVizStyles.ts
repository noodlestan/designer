import {
    DECISION_FONT_SIZE_VALUE,
    DECISION_FONT_WEIGHT_VALUE,
    DECISION_LETTER_SPACING_VALUE,
    DECISION_LINE_HEIGHT_VALUE,
    DECISION_TYPEFACE_VALUE,
    type FontSizeValue,
    type FontWeightValue,
    type LetterSpacingValue,
    type LineHeightValue,
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
};

export const resolveTextStyleVizStyles = (
    v?: TextStyleVizProps['v'],
): Partial<TextStyleVizStyles> => {
    const style: Partial<TextStyleVizStyles> = {};

    if (v?.type() === DECISION_TYPEFACE_VALUE) {
        const typeface = v as TypefaceValue;
        style.__fontFamily = typeface.toString();
    }

    if (v?.type() === DECISION_FONT_SIZE_VALUE) {
        const fontSize = v as FontSizeValue;
        style.__fontSize = fontSize.toString();
    }

    if (v?.type() === DECISION_FONT_WEIGHT_VALUE) {
        const fontWeight = v as FontWeightValue;
        style.__fontWeight = fontWeight.toNumber();
    }

    if (v?.type() === DECISION_LINE_HEIGHT_VALUE) {
        const lineHeight = v as LineHeightValue;
        style.__lineHeight = lineHeight.toString();
    }

    if (v?.type() === DECISION_LETTER_SPACING_VALUE) {
        const letterSpacing = v as LetterSpacingValue;
        style.__letterSpacing = letterSpacing.toString();
    }

    return style;
};
