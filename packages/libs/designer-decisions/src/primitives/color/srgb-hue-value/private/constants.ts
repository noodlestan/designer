import {
    DECISION_COLOR_SET,
    DECISION_COLOR_SRGB_HUE_SET,
    DECISION_COLOR_SRGB_HUE_VALUE,
    DECISION_COLOR_VALUE,
} from '../../../../constants';
import type { ColorChannelName } from '../../../../types';

export const VALUE_NAME = 'SRGBHueValue';
export const FALLBACK_VALUE = 0;
export const REF_CHECKED_TYPES = [
    DECISION_COLOR_SRGB_HUE_VALUE,
    DECISION_COLOR_SRGB_HUE_SET,
    DECISION_COLOR_VALUE,
    DECISION_COLOR_SET,
];

export const CHANNEL_NAME: ColorChannelName = 'srgb-hue';
export const NUMERIC_VALUE_BASE = 0;
