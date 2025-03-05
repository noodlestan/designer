import type {
    ColorChannel,
    ColorComplementaryChannels,
    NumberFormatOptions,
} from '../../../primitives';
import type { BaseValue } from '../base-value';

export type ColorChannelBaseOptions = NumberFormatOptions;

export type ColorChannelBaseValue<
    C extends ColorComplementaryChannels = ColorComplementaryChannels,
> = BaseValue<ColorChannel<C>>;
