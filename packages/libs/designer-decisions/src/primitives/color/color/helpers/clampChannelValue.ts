import type { ColorChannelDefinition } from '../../../color';

export const clampChannelValue = (
    channelDefinition: ColorChannelDefinition,
    raw: number,
): number => {
    const [min, max] = channelDefinition.range;
    return Math.max(min, Math.min(max, raw));
};
