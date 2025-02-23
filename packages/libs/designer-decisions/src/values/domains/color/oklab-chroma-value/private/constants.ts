import {
    DECISION_COLOR_OKLAB_CHROMA_SCALE,
    DECISION_COLOR_OKLAB_CHROMA_VALUE,
} from '../../../../../constants';
import type { ColorObjectLiteral } from '../../../../../inputs';
import type { ColorChannelDefinition } from '../../../../base';
import {
    COLOR_CHANNEL_OKLAB_CHROMA_BASE,
    COLOR_CHANNEL_OKLAB_CHROMA_NAME,
    COLOR_CHANNEL_OKLAB_CHROMA_QUANTIZE,
    COLOR_FORMAT_OKLCH,
} from '../../../../primitives';

export const VALUE_NAME = DECISION_COLOR_OKLAB_CHROMA_VALUE;
export const FALLBACK_VALUE = 0;

export const CHANNEL_DEFINITION: ColorChannelDefinition = {
    valueName: DECISION_COLOR_OKLAB_CHROMA_VALUE,
    channelName: COLOR_CHANNEL_OKLAB_CHROMA_NAME,
    colorFormat: COLOR_FORMAT_OKLCH,
    channelKey: 'c' as keyof ColorObjectLiteral,
    base: COLOR_CHANNEL_OKLAB_CHROMA_BASE,
    quant: COLOR_CHANNEL_OKLAB_CHROMA_QUANTIZE,
    fallback: FALLBACK_VALUE,
    decisionTypes: {
        set: DECISION_COLOR_OKLAB_CHROMA_SCALE,
        value: DECISION_COLOR_OKLAB_CHROMA_VALUE,
    },
};
