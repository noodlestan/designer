import type { Color } from 'chroma-js';

import type { ColorFormat, ColorObjectLiteral, NormalNumber } from '../../decision-inputs';
import type { BaseValue } from '../base';

export type AlphaValue = BaseValue<NormalNumber>;

export type ColorValue = BaseValue<Color> & {
    toObject(format: ColorFormat): ColorObjectLiteral;
    toString(format: ColorFormat): string;
};

export type ColorSet = BaseValue<ColorValue[]>;
