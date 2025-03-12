import {
    type ColorInput,
    type ColorLiteral,
    type ColorObjectInput,
    isDecisionRef,
} from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import { type ValueContext } from '../../../../value';

import { resolveColorObject } from './functions';
import { resolveColorValueRef } from './resolveColorValueRef';

export const resolveColorValue = (
    context: ValueContext<ColorInput>,
): DeepPartial<ColorLiteral> | undefined => {
    const input = context.input();

    if (isDecisionRef(input)) {
        return resolveColorValueRef(context, input);
    }

    if (typeof input === 'object') {
        return resolveColorObject(context, input as ColorObjectInput).toObject();
    }

    return input as DeepPartial<ColorLiteral> | undefined;
};
