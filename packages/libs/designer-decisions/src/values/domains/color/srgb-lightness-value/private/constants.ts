import {
    DECISION_COLOR_SRGB_LIGHTNESS_SCALE,
    DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
} from '../../../../../constants';
import type { ColorObjectLiteral } from '../../../../../inputs';
import type { ColorChannelDefinition } from '../../../../base';
import {
    COLOR_CHANNEL_SRGB_LIGHTNESS_BASE,
    COLOR_CHANNEL_SRGB_LIGHTNESS_NAME,
    COLOR_CHANNEL_SRGB_LIGHTNESS_QUANTIZE,
    COLOR_FORMAT_HSL,
} from '../../../../primitives';

export const VALUE_NAME = DECISION_COLOR_SRGB_LIGHTNESS_VALUE;
export const FALLBACK_VALUE = 0;

export const CHANNEL_DEFINITION: ColorChannelDefinition = {
    valueName: DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
    channelName: COLOR_CHANNEL_SRGB_LIGHTNESS_NAME,
    colorFormat: COLOR_FORMAT_HSL,
    channelKey: 'l' as keyof ColorObjectLiteral,
    base: COLOR_CHANNEL_SRGB_LIGHTNESS_BASE,
    quant: COLOR_CHANNEL_SRGB_LIGHTNESS_QUANTIZE,
    fallback: FALLBACK_VALUE,
    decisionTypes: {
        set: DECISION_COLOR_SRGB_LIGHTNESS_SCALE,
        value: DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
    },
};
