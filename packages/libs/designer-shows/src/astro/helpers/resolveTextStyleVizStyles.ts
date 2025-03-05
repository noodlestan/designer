import {
    DECISION_FONT_SIZE_VALUE,
    DECISION_FONT_WEIGHT_VALUE,
    DECISION_TYPEFACE_VALUE,
    type FontSizeValue,
    type FontWeightValue,
    type TypefaceValue,
} from '@noodlestan/designer-decisions';

import type { TextStyleVizProps } from '../types';

type TextStyleVizStyles = {
    __fontFamily: string;
    __fontSize: string;
    __fontWeight: string;
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
        style.__fontFamily = typeface.get().toString();
    }

    if (v?.type() === DECISION_FONT_SIZE_VALUE) {
        const fontSize = v as FontSizeValue;
        style.__fontSize = fontSize.get().toString();
    }

    if (v?.type() === DECISION_FONT_WEIGHT_VALUE) {
        const fontWeight = v as FontWeightValue;
        style.__fontWeight = fontWeight.get().toString();
    }

    return style;
};
