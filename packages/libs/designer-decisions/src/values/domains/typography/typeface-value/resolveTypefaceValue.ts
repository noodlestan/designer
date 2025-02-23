import {
    type TypefaceValueAttributesInput,
    type TypefaceValueInput,
    isDecisionRef,
} from '../../../../inputs';
import type { DeepPartial } from '../../../../private';
import type { ValueContext } from '../../../../value';
import { type Typeface, createTypeface } from '../../../primitives';

import { FALLBACK_VALUE as fallback, resolveTypefaceCapabilities } from './private';
import { resolveTypefaceValueRef } from './resolveTypefaceValueRef';

export const resolveTypefaceValue = (
    context: ValueContext,
    input: DeepPartial<TypefaceValueInput>,
): Typeface => {
    if (isDecisionRef(input)) {
        return resolveTypefaceValueRef(context, input);
    }

    const {
        fontName = fallback.fontName,
        source,
        capabilities: maybeCapabilities = [],
        ranges = [],
        styles = [],
    } = (input || {}) as TypefaceValueAttributesInput;

    const capabilities = resolveTypefaceCapabilities(context, maybeCapabilities);

    return createTypeface({
        fontName,
        source,
        capabilities,
        ranges,
        styles,
    });
};
