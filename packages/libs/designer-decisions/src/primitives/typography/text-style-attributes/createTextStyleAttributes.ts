import type { TextStyleAttributesLiteral } from '../../../inputs';
import { type PrimitiveContext } from '../../../primitive';

import { normalizeTextStyleAttributes, validateFontStyle, validateTextTransform } from './private';
import type { TextStyleAttributes } from './types';

export function createTextStyleAttributes(
    context: PrimitiveContext<TextStyleAttributesLiteral>,
): TextStyleAttributes {
    const { fontStyle: rawFontStyle, textTransform: rawTextTransform } =
        normalizeTextStyleAttributes(context);

    const fontStyle = validateFontStyle(context, rawFontStyle);
    const textTransform = validateTextTransform(context, rawTextTransform);

    const literal = () => {
        const style: TextStyleAttributesLiteral = {};
        if (fontStyle) {
            style.fontStyle = fontStyle;
        }
        if (textTransform) {
            style.textTransform = textTransform;
        }
        return style;
    };

    const toString = () => {
        return [fontStyle, textTransform]
            .filter(item => item && item !== 'none' && item !== 'normal')
            .join(' ');
    };

    return {
        ...literal(),
        literal,
        toString,
    };
}
