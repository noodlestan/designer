import type { ColorLiteral, ColorObjectLiteral } from '../../../inputs';
import type { PrimitiveContext } from '../../../primitive';
import { COLOR_FORMAT_DEFAULT } from '../constants';

import { chromaColorToLiteral, chromaColorToString } from './helpers';
import { COLOR_QUANTIZE, normalizeColorInput } from './private';
import type { Color, ColorFormatOptions } from './types';

export function createColor(
    context: PrimitiveContext<ColorLiteral>,
    options: ColorFormatOptions = {},
): Color {
    const { chroma } = normalizeColorInput(context);

    const literal = () => ({ chroma });

    const toObject = <T extends ColorObjectLiteral = ColorObjectLiteral>({
        format,
        quantize: q,
    }: ColorFormatOptions = {}): T => {
        return chromaColorToLiteral(
            chroma,
            format ?? options.format ?? COLOR_FORMAT_DEFAULT,
            q ?? options.quantize ?? COLOR_QUANTIZE,
        );
    };

    const toString = ({ format, quantize: q }: ColorFormatOptions = {}) => {
        return chromaColorToString(chroma, format ?? COLOR_FORMAT_DEFAULT, q ?? COLOR_QUANTIZE);
    };

    return {
        ...literal(),
        literal,
        raw: () => chroma,
        toObject,
        toString,
    };
}
