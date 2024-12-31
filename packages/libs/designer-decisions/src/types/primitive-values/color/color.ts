import type { Color } from 'chroma-js';

import type { ColorObjectLiteral, ColorSpaceName, NormalNumber } from '../../decision-inputs';
import type { BaseValue } from '../base';

export type AlphaValue = BaseValue<NormalNumber>;

export type ColorValue = BaseValue<Color> & {
    toObject(space: ColorSpaceName): ColorObjectLiteral;
    toString(space: ColorSpaceName): string;
};

export type ColorSet = BaseValue<ColorValue[]>;
