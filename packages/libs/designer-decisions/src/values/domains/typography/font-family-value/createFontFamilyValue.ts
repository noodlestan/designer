import type { FontFamilyInput } from '../../../../inputs';
import { createFontFamily } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import type { FontFamilyValue } from '../types';

import { resolveFontFamilyValue } from './resolveFontFamilyValue';

export const createFontFamilyValue = (context: ValueContext<FontFamilyInput>): FontFamilyValue => {
    const get = () => {
        const literal = resolveFontFamilyValue(context);
        return createFontFamily(context.forPrimitive(literal));
    };

    return createBaseValue(context, get);
};
