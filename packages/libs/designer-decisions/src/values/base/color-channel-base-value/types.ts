import type {
    ColorChannel,
    ColorChannelOptions,
    ColorComplementaryChannels,
    NumberFormatOptions,
} from '../../../primitives';
import type { ColorValue } from '../../domains';
import type { BaseValue } from '../base-value';

export type ColorChannelBaseOptions = NumberFormatOptions;

export type ColorChannelBaseValue<
    C extends ColorComplementaryChannels = ColorComplementaryChannels,
> = BaseValue<ColorChannel<C>> & {
    toColorValue(channels: C, options?: ColorChannelOptions): ColorValue;
};
