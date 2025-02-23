import chroma, { type Color as ChromaColor } from 'chroma-js';

import type { ColorLiteral } from '../../../../inputs';

export function chromaColorFromLiteral(input: ColorLiteral): ChromaColor {
    if (typeof input === 'object') {
        if ('c' in input) {
            return chroma.oklch(input.l, input.c, input.h);
        } else if ('s' in input) {
            return chroma.hsl(input.h, input.s, input.l);
        } else if ('a' in input) {
            return chroma.oklab(input.l, input.a, input.b);
        } else {
            throw new Error(`Invalid color object.`);
        }
    }
    try {
        return chroma(input);
    } catch (error) {
        throw new Error(`Invalid color literal "${error}".`);
    }
}
