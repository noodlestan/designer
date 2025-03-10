import type { SizeLiteral } from '../../../inputs';
import type { PrimitiveContext } from '../../../primitive';
import { quantized } from '../../number';

import { normalizeSizeInput } from './private';
import type { Size, SizeDefinition, SizeOptions } from './types';

export function createSize(
    sizeDefinition: SizeDefinition,
    context: PrimitiveContext<SizeLiteral>,
    options?: SizeOptions,
): Size {
    const { base } = sizeDefinition;
    const { quantize = sizeDefinition.quantize } = options || {};

    const { value, unit } = normalizeSizeInput(sizeDefinition, context);

    const literal = () => {
        return { value, unit };
    };

    const getQuantized = (q?: number) => {
        const { value, unit } = literal();
        return {
            value: quantized(value, q ?? quantize, base),
            unit,
        };
    };

    const toNumber = ({ quantize: q }: SizeOptions = {}) => {
        const { value } = getQuantized(q ?? quantize);
        return value;
    };

    const toString = ({ quantize: q }: SizeOptions = {}) => {
        const { value, unit } = getQuantized(q ?? quantize);
        return `${value}${unit || ''}`;
    };

    return {
        ...literal(),
        literal,
        quantize: getQuantized,
        toNumber,
        toString,
    };
}
