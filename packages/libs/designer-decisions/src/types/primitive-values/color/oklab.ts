import type { ColorOklabAxisLiteral, Degrees, NormalNumber } from '../../decision-inputs';
import type { BaseSet, BaseValue } from '../base';

import type { ColorValue } from './color';

export type OklabLightnessValue = BaseValue<NormalNumber> & {
    toColor: (components: { c: ColorOklabAxisLiteral; h: Degrees }) => ColorValue;
};

export type OklabChromaValue = BaseValue<ColorOklabAxisLiteral> & {
    toColor: (components: { l: NormalNumber; h: Degrees }) => ColorValue;
};

export type OklabHueValue = BaseValue<Degrees> & {
    toColor: (components: { l: NormalNumber; c: ColorOklabAxisLiteral }) => ColorValue;
};

export type OklabLightnessScale = BaseSet<OklabLightnessValue>;

export type OklabChromaScale = BaseSet<OklabChromaValue>;

export type OklabHueSet = BaseSet<OklabHueValue>;
