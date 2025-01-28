import type { ColorChannelName } from '../../../types';

export const clampChannelValue = (rawValue: number, channel: ColorChannelName): number => {
    switch (channel) {
        case 'oklab-lightness':
            return Math.max(0, Math.min(1, rawValue));
        case 'oklab-chroma':
            return Math.max(0, Math.min(0.5, rawValue));
        case 'oklab-hue':
            return Math.max(0, Math.min(360, rawValue));
        case 'srgb-hue':
            return Math.max(0, Math.min(360, rawValue));
        case 'srgb-saturation':
            return Math.max(0, Math.min(1, rawValue));
        case 'srgb-lightness':
            return Math.max(0, Math.min(1, rawValue));
    }
};
