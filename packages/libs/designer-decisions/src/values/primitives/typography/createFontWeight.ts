import type { FontWeightLiteral } from '../../../inputs';

import { fontWeightFromName, isValidFontWeightName } from './helpers';
import type { FontWeight } from './types';

export const createFontWeight = (value: FontWeightLiteral): FontWeight => {
    const named = typeof value === 'string';
    const isValidName = !named || isValidFontWeightName(value);
    const numeric = named ? fontWeightFromName(value) : value;
    const formatted = named && isValidName ? value : numeric;

    return {
        value: numeric,
        named: () => (named && isValidName ? value : undefined),
        toString: () => String(formatted),
    };
};
