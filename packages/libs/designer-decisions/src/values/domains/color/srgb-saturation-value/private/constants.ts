import {
    DECISION_COLOR_SRGB_SATURATION_SCALE,
    DECISION_COLOR_SRGB_SATURATION_VALUE,
} from '../../../../../constants';
import type { ColorObjectLiteral } from '../../../../../inputs';
import type { ColorChannelDefinition } from '../../../../../primitives';
import {
    COLOR_CHANNEL_FALLBACK_NUMERIC,
    COLOR_CHANNEL_SRGB_SATURATION_BASE,
    COLOR_CHANNEL_SRGB_SATURATION_NAME,
    COLOR_CHANNEL_SRGB_SATURATION_QUANTIZE,
    COLOR_FORMAT_HSL,
} from '../../../../../primitives';

export const CHANNEL_DEFINITION: ColorChannelDefinition = {
    valueName: DECISION_COLOR_SRGB_SATURATION_VALUE,
    channelName: COLOR_CHANNEL_SRGB_SATURATION_NAME,
    colorFormat: COLOR_FORMAT_HSL,
    channelKey: 's' as keyof ColorObjectLiteral,
    range: [0, 1],
    base: COLOR_CHANNEL_SRGB_SATURATION_BASE,
    quantize: COLOR_CHANNEL_SRGB_SATURATION_QUANTIZE,
    fallback: COLOR_CHANNEL_FALLBACK_NUMERIC,
    decisionTypes: {
        set: DECISION_COLOR_SRGB_SATURATION_SCALE,
        value: DECISION_COLOR_SRGB_SATURATION_VALUE,
    },
};
