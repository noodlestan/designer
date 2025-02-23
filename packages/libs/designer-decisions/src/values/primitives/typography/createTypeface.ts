import type { Typeface } from '..';
import type { TypefaceLiteral } from '../../../inputs';

type TypefaceLiteralPartial = Partial<TypefaceLiteral> & {
    fontName: string;
};

export function createTypeface(input: TypefaceLiteralPartial): Typeface {
    const { fontName, source, capabilities = [], ranges = [], styles = [] } = input;

    return {
        fontName,
        source,
        capabilities,
        ranges,
        styles,
        toString: () => input.fontName,
    };
}
