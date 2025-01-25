import type { ColorOklabChannelName, ColorOklabChannelValue } from './oklab';
import type { ColorSRGBChannelName, ColorSRGBChannelValue } from './srgb';

export type ColorChannelName = ColorSRGBChannelName | ColorOklabChannelName;

export type ColorChannelValue = ColorSRGBChannelValue | ColorOklabChannelValue;
