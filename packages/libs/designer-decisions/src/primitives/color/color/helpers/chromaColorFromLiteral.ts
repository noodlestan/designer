import chroma, { type Color as ChromaColor } from 'chroma-js';

import {
    type ColorLiteral,
    type ColorObjectLiteral,
    type ColorOkLCHLiteral,
    type ColorOkLabLiteral,
    type ColorSRGBHSLiteral,
} from '../../../../inputs';
import { isObject } from '../../../../private';

const isColorFormat = <T extends ColorObjectLiteral>(
    literal: Partial<ColorObjectLiteral>,
    keys: [string, string, string],
): literal is T => {
    return (
        typeof literal[keys[0] as keyof ColorObjectLiteral] === 'number' &&
        typeof literal[keys[1] as keyof ColorObjectLiteral] === 'number' &&
        typeof literal[keys[2] as keyof ColorObjectLiteral] === 'number'
    );
};

export function chromaColorFromLiteral(input: Partial<ColorLiteral>): ChromaColor {
    if (isObject(input)) {
        if (isColorFormat<ColorOkLCHLiteral>(input, ['l', 'c', 'h'])) {
            return chroma.oklch(input.l, input.c, input.h);
        } else if (isColorFormat<ColorSRGBHSLiteral>(input, ['h', 's', 'l'])) {
            return chroma.hsl(input.h, input.s, input.l);
        } else if (isColorFormat<ColorOkLabLiteral>(input, ['l', 'a', 'b'])) {
            return chroma.oklab(input.l, input.a, input.b);
        } else {
            throw new Error(`Invalid color object. Supported: {l,c,h}, {h,s,l} and {l,a,b}.`);
        }
    }
    try {
        return chroma(input);
    } catch (error) {
        throw new Error(`Invalid color literal "${error}".`);
    }
}
