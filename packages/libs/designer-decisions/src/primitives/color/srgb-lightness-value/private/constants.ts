import {
    DECISION_COLOR_SET,
    DECISION_COLOR_SRGB_LIGHTNESS_SCALE,
    DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
    DECISION_COLOR_VALUE,
} from '../../../../constants';
import type { ColorChannelName } from '../../../../types';

export const VALUE_NAME = 'SRGBLightnessValue';
export const FALLBACK_VALUE = 0;
export const REF_CHECKED_TYPES = [
    DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
    DECISION_COLOR_SRGB_LIGHTNESS_SCALE,
    DECISION_COLOR_VALUE,
    DECISION_COLOR_SET,
];

export const CHANNEL_NAME: ColorChannelName = 'srgb-lightness';
export const NUMERIC_VALUE_BASE = 2;
