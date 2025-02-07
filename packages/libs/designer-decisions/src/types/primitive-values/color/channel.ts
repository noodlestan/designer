import type { BaseNumericValue, NumberValueOptions } from '../number';

import type { ColorValue } from './color';
import type {
    ColorOklabChannelName,
    ColorOklabChannelValue,
    ColorOklabComplementaryChannels,
} from './oklab';
import type {
    ColorSRGBChannelName,
    ColorSRGBChannelValue,
    ColorSRGBComplementaryChannels,
} from './srgb';

export type ColorChannelName = ColorSRGBChannelName | ColorOklabChannelName;

export type ColorChannelValue = ColorSRGBChannelValue | ColorOklabChannelValue;

export type ColorChannelBaseValue<
    C extends ColorComplementaryChannels,
    T extends number = number,
> = BaseNumericValue<T> & {
    name: () => ColorChannelName;
    toColor: (channels: C) => ColorValue;
};

export type ColorChannelValueCommon = Omit<
    ColorSRGBChannelValue | ColorOklabChannelValue,
    'toColor'
> & {
    toColor: (
        channels: ColorSRGBComplementaryChannels | ColorOklabComplementaryChannels,
    ) => ColorValue;
};

export type ColorComplementaryChannels =
    | ColorSRGBComplementaryChannels
    | ColorOklabComplementaryChannels;

export type ColorchannelOptions = NumberValueOptions;
