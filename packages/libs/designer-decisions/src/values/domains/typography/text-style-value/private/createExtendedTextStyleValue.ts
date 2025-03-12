import type { DecisionRef, TextStyleInput, ValueContext } from '../../../../..';
import type { TextStyleValue } from '../../types';
import { createTextStyleValue } from '../createTextStyleValue';

export function createExtendedTextStyleValue(
    context: ValueContext<TextStyleInput>,
    extendRef: DecisionRef | undefined,
): TextStyleValue | undefined {
    return extendRef ? createTextStyleValue(context.forChildValue(extendRef)) : undefined;
}
