import { PRIMITIVE_COLOR_CHANNEL } from '../../../../constants';
import { type PrimitiveContext, handlePrimitiveInputError } from '../../../../primitive';
import { isObject } from '../../../../private';
import type {
    ColorChannelDefinition,
    ColorChannelLiteral,
    ColorChannelObjectLiteral,
} from '../types';

export function normalizeColorChannelInput(
    channelDefinition: ColorChannelDefinition,
    context: PrimitiveContext<ColorChannelLiteral>,
): ColorChannelObjectLiteral {
    const input = context.input();

    const { fallback } = channelDefinition;

    if (isObject(input)) {
        if (typeof input.value === 'number' && !isNaN(input.value)) {
            return input as ColorChannelObjectLiteral;
        }
        handlePrimitiveInputError(
            context,
            PRIMITIVE_COLOR_CHANNEL,
            input,
            'Invalid ColorChannelObjectLiteral',
        );
        return { value: fallback };
    }

    if (typeof input === 'number' && !isNaN(input)) {
        return { value: input };
    }

    handlePrimitiveInputError(
        context,
        PRIMITIVE_COLOR_CHANNEL,
        input,
        'Invalid ColorChannelLiteral',
    );
    return { value: fallback };
}
