import {
    DECISION_COLOR_OKLAB_CHROMA_SCALE,
    DECISION_COLOR_OKLAB_CHROMA_VALUE,
} from '../../../../../constants';
import type { ColorObjectLiteral } from '../../../../../inputs';
import type { ColorChannelDefinition } from '../../../../../primitives';
import {
    COLOR_CHANNEL_FALLBACK_NUMERIC,
    COLOR_CHANNEL_OKLAB_CHROMA_BASE,
    COLOR_CHANNEL_OKLAB_CHROMA_NAME,
    COLOR_CHANNEL_OKLAB_CHROMA_QUANTIZE,
    COLOR_FORMAT_OKLCH,
} from '../../../../../primitives';

export const CHANNEL_DEFINITION: ColorChannelDefinition = {
    valueName: DECISION_COLOR_OKLAB_CHROMA_VALUE,
    channelName: COLOR_CHANNEL_OKLAB_CHROMA_NAME,
    colorFormat: COLOR_FORMAT_OKLCH,
    channelKey: 'c' as keyof ColorObjectLiteral,
    range: [0, 0.5],
    base: COLOR_CHANNEL_OKLAB_CHROMA_BASE,
    quantize: COLOR_CHANNEL_OKLAB_CHROMA_QUANTIZE,
    fallback: COLOR_CHANNEL_FALLBACK_NUMERIC,
    decisionTypes: {
        set: DECISION_COLOR_OKLAB_CHROMA_SCALE,
        value: DECISION_COLOR_OKLAB_CHROMA_VALUE,
    },
};
