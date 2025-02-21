import { type ValueContext, createValueInputError } from '../../../../../value';

import { VALUE_NAME as valueName } from './constants';
import { isTypefaceCapability } from './isTypefaceCapability';

export const resolveTypefaceCapabilities = (
    context: ValueContext,
    capabilities: string[],
): string[] => {
    return capabilities.filter(c => {
        if (!isTypefaceCapability(c)) {
            context.addError(
                createValueInputError({
                    context,
                    valueName,
                    input: c,
                    error: 'Unsupported capability',
                }),
            );
            return false;
        }
        return true;
    });
};
