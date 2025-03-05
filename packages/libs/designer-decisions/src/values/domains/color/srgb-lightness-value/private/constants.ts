import {
    DECISION_COLOR_SRGB_LIGHTNESS_SCALE,
    DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
} from '../../../../../constants';
import type { ColorObjectLiteral } from '../../../../../inputs';
import type { ColorChannelDefinition } from '../../../../../primitives';
import {
    COLOR_CHANNEL_FALLBACK_NUMERIC,
    COLOR_CHANNEL_SRGB_LIGHTNESS_BASE,
    COLOR_CHANNEL_SRGB_LIGHTNESS_NAME,
    COLOR_CHANNEL_SRGB_LIGHTNESS_QUANTIZE,
    COLOR_FORMAT_HSL,
} from '../../../../../primitives';

export const CHANNEL_DEFINITION: ColorChannelDefinition = {
    valueName: DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
    channelName: COLOR_CHANNEL_SRGB_LIGHTNESS_NAME,
    colorFormat: COLOR_FORMAT_HSL,
    channelKey: 'l' as keyof ColorObjectLiteral,
    range: [0, 1],
    base: COLOR_CHANNEL_SRGB_LIGHTNESS_BASE,
    quantize: COLOR_CHANNEL_SRGB_LIGHTNESS_QUANTIZE,
    fallback: COLOR_CHANNEL_FALLBACK_NUMERIC,
    decisionTypes: {
        set: DECISION_COLOR_SRGB_LIGHTNESS_SCALE,
        value: DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
    },
};
