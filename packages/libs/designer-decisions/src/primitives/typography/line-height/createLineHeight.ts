import type { LineHeightLiteral } from '../../../inputs';
import { type PrimitiveContext } from '../../../primitive';
import { quantized } from '../../../primitives';

import { LINE_HEIGHT_QUANTIZE } from './constants';
import { normalizeLineHeightInput } from './private';
import type { LineHeight, LineHeightFormatOptions } from './types';

export const createLineHeight = (context: PrimitiveContext<LineHeightLiteral>): LineHeight => {
    const { value, unit } = normalizeLineHeightInput(context);

    const literal = () => {
        return { value, unit };
    };

    const getQuantized = (options?: LineHeightFormatOptions) => {
        const { value, unit } = literal();
        return {
            value: quantized(value, options?.quantize ?? LINE_HEIGHT_QUANTIZE),
            unit,
        };
    };

    const toString = (options?: LineHeightFormatOptions) => {
        const { value, unit } = getQuantized(options);
        return `${value}${unit || ''}`;
    };

    return {
        ...literal(),
        literal,
        quantize: getQuantized,
        toString,
    };
};
