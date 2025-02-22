import {
    DECISION_COLOR_OKLAB_LIGHTNESS_SCALE,
    DECISION_COLOR_OKLAB_LIGHTNESS_VALUE,
} from '../../../../../constants';
import type { ColorObjectLiteral } from '../../../../../inputs';
import {
    COLOR_CHANNEL_OKLAB_LIGHTNESS_BASE,
    COLOR_CHANNEL_OKLAB_LIGHTNESS_NAME,
    COLOR_CHANNEL_OKLAB_LIGHTNESS_QUANTIZE,
    COLOR_FORMAT_OKLCH,
} from '../../../../primitives';
import type { ColorChannelDefinition } from '../../_private';

export const VALUE_NAME = DECISION_COLOR_OKLAB_LIGHTNESS_VALUE;
export const FALLBACK_VALUE = 0;

export const CHANNEL_ATTRIBUTES: ColorChannelDefinition = {
    valueName: DECISION_COLOR_OKLAB_LIGHTNESS_VALUE,
    channelName: COLOR_CHANNEL_OKLAB_LIGHTNESS_NAME,
    colorFormat: COLOR_FORMAT_OKLCH,
    channelKey: 'l' as keyof ColorObjectLiteral,
    base: COLOR_CHANNEL_OKLAB_LIGHTNESS_BASE,
    quant: COLOR_CHANNEL_OKLAB_LIGHTNESS_QUANTIZE,
    fallback: FALLBACK_VALUE,
    decisionTypes: {
        set: DECISION_COLOR_OKLAB_LIGHTNESS_SCALE,
        value: DECISION_COLOR_OKLAB_LIGHTNESS_VALUE,
    },
};
