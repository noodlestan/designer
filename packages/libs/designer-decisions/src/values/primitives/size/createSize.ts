import type { SizeObjectLiteral } from '../../../inputs';

import type { Size } from './types';

export function createSize(input: SizeObjectLiteral): Size {
    const { value, units } = input;

    return {
        value,
        units,
        toString: () => `${value}${units}`,
    };
}
