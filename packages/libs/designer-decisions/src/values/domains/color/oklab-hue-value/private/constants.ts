import {
    DECISION_COLOR_OKLAB_HUE_SET,
    DECISION_COLOR_OKLAB_HUE_VALUE,
} from '../../../../../constants';
import type { ColorObjectLiteral } from '../../../../../inputs';
import {
    COLOR_CHANNEL_OKLAB_HUE_BASE,
    COLOR_CHANNEL_OKLAB_HUE_NAME,
    COLOR_CHANNEL_OKLAB_HUE_QUANTIZE,
    COLOR_FORMAT_OKLCH,
} from '../../../../primitives';
import type { ColorChannelDefinition } from '../../_private';

export const VALUE_NAME = DECISION_COLOR_OKLAB_HUE_VALUE;
export const FALLBACK_VALUE = 0;

export const CHANNEL_ATTRIBUTES: ColorChannelDefinition = {
    valueName: DECISION_COLOR_OKLAB_HUE_VALUE,
    channelName: COLOR_CHANNEL_OKLAB_HUE_NAME,
    colorFormat: COLOR_FORMAT_OKLCH,
    channelKey: 'h' as keyof ColorObjectLiteral,
    base: COLOR_CHANNEL_OKLAB_HUE_BASE,
    quant: COLOR_CHANNEL_OKLAB_HUE_QUANTIZE,
    fallback: FALLBACK_VALUE,
    decisionTypes: {
        set: DECISION_COLOR_OKLAB_HUE_SET,
        value: DECISION_COLOR_OKLAB_HUE_VALUE,
    },
};
