import {
    DECISION_COLOR_SRGB_SATURATION_SCALE,
    DECISION_COLOR_SRGB_SATURATION_VALUE,
} from '../../../../../constants';
import type { ColorObjectLiteral } from '../../../../../inputs';
import {
    COLOR_CHANNEL_SRGB_SATURATION_BASE,
    COLOR_CHANNEL_SRGB_SATURATION_NAME,
    COLOR_CHANNEL_SRGB_SATURATION_QUANTIZE,
    COLOR_FORMAT_HSL,
} from '../../../../primitives';
import type { ColorChannelDefinition } from '../../_private';

export const VALUE_NAME = DECISION_COLOR_SRGB_SATURATION_VALUE;
export const FALLBACK_VALUE = 0;

export const CHANNEL_ATTRIBUTES: ColorChannelDefinition = {
    valueName: DECISION_COLOR_SRGB_SATURATION_VALUE,
    channelName: COLOR_CHANNEL_SRGB_SATURATION_NAME,
    colorFormat: COLOR_FORMAT_HSL,
    channelKey: 's' as keyof ColorObjectLiteral,
    base: COLOR_CHANNEL_SRGB_SATURATION_BASE,
    quant: COLOR_CHANNEL_SRGB_SATURATION_QUANTIZE,
    fallback: FALLBACK_VALUE,
    decisionTypes: {
        set: DECISION_COLOR_SRGB_SATURATION_SCALE,
        value: DECISION_COLOR_SRGB_SATURATION_VALUE,
    },
};
