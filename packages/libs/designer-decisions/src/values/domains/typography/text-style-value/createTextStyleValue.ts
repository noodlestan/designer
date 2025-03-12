import type { TextStyleInput, TextStyleObjectInput } from '../../../../inputs';
import { createTextStyleAttributes } from '../../../../primitives';
import type { ValueContext } from '../../../../value';
import { createBaseValue } from '../../../base';
import { createFontFamilyValue } from '../font-family-value';
import { createFontSizeValue } from '../font-size-value';
import { createFontWeightValue } from '../font-weight-value';
import { createLetterSpacingValue } from '../letter-spacing-value';
import { createLineHeightValue } from '../line-height-value';
import type { TextStyleValue } from '../types';

import { createExtendedTextStyleValue } from './private';
import { resolveTextStyleValue } from './resolveTextStyleValue';

const maybeCreateValue = <I, V>(
    context: ValueContext,
    factory: (context: ValueContext<I>) => V,
    value: I | undefined,
): V | undefined => {
    if (value !== undefined) {
        return factory(context.forChildValue(value));
    }
};

export const createTextStyleValue = (context: ValueContext<TextStyleInput>): TextStyleValue => {
    const input = resolveTextStyleValue(context);
    const attributes = createTextStyleAttributes(context.forPrimitive(input));

    const { extend, fontFamily, fontSize, fontWeight, lineHeight, letterSpacing } = input || {};

    const parent = createExtendedTextStyleValue(context, extend) || {};

    const composite = {
        ...parent,
        fontFamily: maybeCreateValue(context, createFontFamilyValue, fontFamily),
        fontSize: maybeCreateValue(context, createFontSizeValue, fontSize),
        fontWeight: maybeCreateValue(context, createFontWeightValue, fontWeight),
        lineHeight: maybeCreateValue(context, createLineHeightValue, lineHeight),
        letterSpacing: maybeCreateValue(context, createLetterSpacingValue, letterSpacing),
        ...attributes,
    };

    const literal = (): TextStyleObjectInput => ({
        fontFamily: composite.fontFamily?.toString(),
        fontSize: composite.fontSize?.literal(),
        fontWeight: composite.fontWeight?.literal(),
        lineHeight: composite.lineHeight?.literal(),
        letterSpacing: composite.letterSpacing?.literal(),
        ...attributes,
    });

    const toString = (): string => {
        const parts: (string | undefined)[] = [];

        parts.push(composite.fontFamily?.fontName);
        parts.push(composite.fontWeight?.toString());
        parts.push(composite.fontSize?.toString());
        if (composite.lineHeight) {
            parts.push(`height: ${composite.lineHeight?.toString()}`);
        }
        parts.push(attributes.toString());
        if (composite.letterSpacing) {
            parts.push(`spacing: ${composite.letterSpacing?.toString()}`);
        }

        return parts.filter(Boolean).join(' / ');
    };

    const get = () => {
        return {
            ...composite,
            literal,
            toString,
        };
    };

    return createBaseValue(context, get);
};
