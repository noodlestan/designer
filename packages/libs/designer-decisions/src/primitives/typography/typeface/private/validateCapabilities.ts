import { PRIMITIVE_TYPEFACE } from '../../../../constants';
import { type TypefaceLiteral } from '../../../../inputs';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';

import { isTypefaceCapability } from './isTypefaceCapability';

export function validateCapabilities(
    context: PrimitiveContext<TypefaceLiteral>,
    capabilities: unknown[],
): string[] {
    return (capabilities ?? []).filter(capability => {
        if (isTypefaceCapability(capability as string)) {
            return true;
        }
        handlePrimitiveInputError(
            context,
            PRIMITIVE_TYPEFACE,
            capability,
            'Unsupported capability',
        );
        return false;
    }) as string[];
}
