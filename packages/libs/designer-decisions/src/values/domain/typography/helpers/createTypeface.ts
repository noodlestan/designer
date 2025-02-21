import type { TypefaceLiteral } from '../../../../inputs';
import type { Typeface } from '../types';

export function createTypeface(input: TypefaceLiteral): Typeface {
    return {
        ...input,
        toString: () => input.fontName,
    };
}
