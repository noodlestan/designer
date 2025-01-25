import type { Degrees, NormalNumber } from '../../decision-inputs';
import type { BaseSet, BaseValue } from '../base';

import type { ColorValue } from './color';

export type SRGBHueValue = BaseValue<Degrees> & {
    toColor: (components: { s: NormalNumber; l: NormalNumber }) => ColorValue;
};

export type SRGBSaturationValue = BaseValue<NormalNumber> & {
    toColor: (components: { h: Degrees; l: NormalNumber }) => ColorValue;
};

export type SRGBLightnessValue = BaseValue<NormalNumber> & {
    toColor: (components: { h: Degrees; s: NormalNumber }) => ColorValue;
};

export type SRGBHueSet = BaseSet<SRGBHueValue>;

export type SRGBSaturationScale = BaseSet<SRGBSaturationValue>;

export type SRGBLightnessScale = BaseSet<SRGBLightnessValue>;

export type ColorSRGBChannelName = 'srgb-hue' | 'srgb-saturation' | 'srgb-lightness';
