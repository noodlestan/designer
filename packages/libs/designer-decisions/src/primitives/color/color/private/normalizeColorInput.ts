import chroma from 'chroma-js';

import { PRIMITIVE_COLOR } from '../../../../constants';
import type { ColorLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { COLOR_FALLBACK_LITERAL, COLOR_FALLBACK_NUMBER } from '../constants';
import { chromaColorFromLiteral } from '../helpers';
import type { ChromaColorLiteral } from '../types';

export function normalizeColorInput(context: PrimitiveContext<ColorLiteral>): ChromaColorLiteral {
    const input = context.input();

    try {
        const chromaColor = chromaColorFromLiteral(input || COLOR_FALLBACK_LITERAL);
        return { chroma: chromaColor };
    } catch (error) {
        const chromaColor = chroma(COLOR_FALLBACK_NUMBER);
        handlePrimitiveInputError(context, PRIMITIVE_COLOR, input, error);
        return { chroma: chromaColor };
    }
}
