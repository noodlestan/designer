import {
    DECISION_COLOR_OKLAB_HUE_SET,
    DECISION_COLOR_OKLAB_HUE_VALUE,
} from '../../../../../constants';
import type { ColorObjectLiteral } from '../../../../../inputs';
import type { ColorChannelDefinition } from '../../../../../primitives';
import {
    COLOR_CHANNEL_FALLBACK_NUMERIC,
    COLOR_CHANNEL_OKLAB_HUE_BASE,
    COLOR_CHANNEL_OKLAB_HUE_NAME,
    COLOR_CHANNEL_OKLAB_HUE_QUANTIZE,
    COLOR_FORMAT_OKLCH,
} from '../../../../../primitives';

export const CHANNEL_DEFINITION: ColorChannelDefinition = {
    valueName: DECISION_COLOR_OKLAB_HUE_VALUE,
    channelName: COLOR_CHANNEL_OKLAB_HUE_NAME,
    colorFormat: COLOR_FORMAT_OKLCH,
    channelKey: 'h' as keyof ColorObjectLiteral,
    range: [0, 360],
    base: COLOR_CHANNEL_OKLAB_HUE_BASE,
    quantize: COLOR_CHANNEL_OKLAB_HUE_QUANTIZE,
    fallback: COLOR_CHANNEL_FALLBACK_NUMERIC,
    decisionTypes: {
        set: DECISION_COLOR_OKLAB_HUE_SET,
        value: DECISION_COLOR_OKLAB_HUE_VALUE,
    },
};
