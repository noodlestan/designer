import type { LineHeightInput } from '../../../../inputs';
import { createLineHeight } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import type { LineHeightValue } from '../types';

import { resolveLineHeightValue } from './resolveLineHeightValue';

export const createLineHeightValue = (
    context: ValueContext<LineHeightInput>,
    // options: LineHeightValueOptions = {},
): LineHeightValue => {
    const get = () => {
        const literal = resolveLineHeightValue(context);
        return createLineHeight(context.forPrimitive(literal));
    };

    return createBaseValue(context, get);
};
