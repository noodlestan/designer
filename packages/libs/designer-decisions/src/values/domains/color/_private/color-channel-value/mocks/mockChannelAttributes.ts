import {
    DECISION_COLOR_OKLAB_HUE_SET,
    DECISION_COLOR_OKLAB_HUE_VALUE,
} from '../../../../../../constants';
import type { ColorObjectLiteral } from '../../../../../../inputs';
import {
    COLOR_CHANNEL_OKLAB_HUE_BASE,
    COLOR_CHANNEL_OKLAB_HUE_NAME,
    COLOR_CHANNEL_OKLAB_HUE_QUANTIZE,
    COLOR_FORMAT_OKLCH,
} from '../../../../../primitives';
import type { ColorChannelDefinition } from '../types';

export const mockChannelAttributes: ColorChannelDefinition = {
    valueName: DECISION_COLOR_OKLAB_HUE_VALUE,
    channelName: COLOR_CHANNEL_OKLAB_HUE_NAME,
    colorFormat: COLOR_FORMAT_OKLCH,
    channelKey: 'h' as keyof ColorObjectLiteral,
    base: COLOR_CHANNEL_OKLAB_HUE_BASE,
    quant: COLOR_CHANNEL_OKLAB_HUE_QUANTIZE,
    fallback: 0.05,
    decisionTypes: {
        set: DECISION_COLOR_OKLAB_HUE_SET,
        value: DECISION_COLOR_OKLAB_HUE_VALUE,
    },
};
