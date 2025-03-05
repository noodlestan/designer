import type { FontWeightLiteral } from '../../../inputs';
import type { PrimitiveContext } from '../../../primitive';

import { normalizeFontWeightInput } from './private';
import type { FontWeight } from './types';

export const createFontWeight = (context: PrimitiveContext<FontWeightLiteral>): FontWeight => {
    const { value, name } = normalizeFontWeightInput(context);

    const literal = () => {
        return { value, name };
    };

    const toNumber = () => value;

    const toString = () => name || String(value);

    return {
        ...literal(),
        literal,
        toNumber,
        toString,
    };
};
