import { D_OKLAB_HUE_SET, D_OKLAB_HUE_VALUE } from '../../constants';
import type { ColorObjectLiteral } from '../../inputs';
import {
    COLOR_CHANNEL_OKLAB_HUE_BASE,
    COLOR_CHANNEL_OKLAB_HUE_NAME,
    COLOR_CHANNEL_OKLAB_HUE_QUANTIZE,
    COLOR_FORMAT_OKLCH,
    type ColorChannelDefinition,
} from '../../primitives';

export const mockChannelDefinition: ColorChannelDefinition = {
    valueName: D_OKLAB_HUE_VALUE,
    channelName: COLOR_CHANNEL_OKLAB_HUE_NAME,
    colorFormat: COLOR_FORMAT_OKLCH,
    channelKey: 'h' as keyof ColorObjectLiteral,
    range: [-1000, 1000],
    base: COLOR_CHANNEL_OKLAB_HUE_BASE,
    quantize: COLOR_CHANNEL_OKLAB_HUE_QUANTIZE,
    fallback: 331.31,
    decisionTypes: {
        set: D_OKLAB_HUE_SET,
        value: D_OKLAB_HUE_VALUE,
    },
};
