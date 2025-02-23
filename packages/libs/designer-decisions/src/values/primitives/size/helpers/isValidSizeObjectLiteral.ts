import type { SizeObjectLiteral } from '../../../../inputs';

import { SIZE_ABSOLUTE_UNITS } from './constants';

export const isValidSizeObjectLiteral = (input: unknown): input is SizeObjectLiteral => {
    if (typeof input !== 'object' || input === null) {
        return false;
    }

    const { value, units } = input as Partial<SizeObjectLiteral>;

    if (typeof value !== 'number' || isNaN(value)) {
        return false;
    }

    if (typeof units !== 'string' || !SIZE_ABSOLUTE_UNITS.includes(units)) {
        return false;
    }

    return true;
};
