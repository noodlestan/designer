import { DECISION_COLOR_VALUE as valueName } from '../../../../../constants';
import type { ColorObjectInput } from '../../../../../inputs';
import {
    COLOR_FALLBACK_LITERAL,
    type Color,
    type ColorChannelLiteral,
    createColor,
} from '../../../../../primitives';
import { type DeepPartial, isObject } from '../../../../../private';
import { type ValueContext, createValueInputError } from '../../../../../value';
import { resolveOklabChromaValue } from '../../oklab-chroma-value';
import { resolveOklabHueValue } from '../../oklab-hue-value';
import { resolveOklabLightnessValue } from '../../oklab-lightness-value';
import { resolveSRGBHueValue } from '../../srgb-hue-value';
import { resolveSRGBLightnessValue } from '../../srgb-lightness-value';
import { resolveSRGBSaturationValue } from '../../srgb-saturation-value';

const resolveChannel = (resolved: DeepPartial<ColorChannelLiteral> | undefined): number => {
    return (isObject(resolved) ? resolved.value : resolved) || 0;
};

export function resolveColorObject(context: ValueContext, input: ColorObjectInput): Color {
    if ('s' in input) {
        const h = resolveChannel(resolveSRGBHueValue(context.childContext(input.h)));
        const s = resolveChannel(resolveSRGBSaturationValue(context.childContext(input.s)));
        const l = resolveChannel(resolveSRGBLightnessValue(context.childContext(input.l)));
        return createColor(context.primitiveContext({ h, s, l }));
    } else if ('a' in input) {
        const l = resolveChannel(resolveOklabLightnessValue(context.childContext(input.l)));
        const a = resolveChannel(input.a);
        const b = resolveChannel(input.b);
        return createColor(context.primitiveContext({ l, a, b }));
    } else if ('c' in input) {
        const l = resolveChannel(resolveOklabLightnessValue(context.childContext(input.l)));
        const c = resolveChannel(resolveOklabChromaValue(context.childContext(input.c)));
        const h = resolveChannel(resolveOklabHueValue(context.childContext(input.h)));
        return createColor(context.primitiveContext({ l, c, h }));
    }
    context.addError(createValueInputError({ context, valueName, input }));
    return createColor(context.primitiveContext(COLOR_FALLBACK_LITERAL));
}
