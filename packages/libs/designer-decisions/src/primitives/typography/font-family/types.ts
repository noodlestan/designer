import type { FontFamilyArrayLiteral } from '../../../inputs';
import type { Primitive } from '../../../primitive';

export type FontFamilyAttributes = {
    families: FontFamilyArrayLiteral;
};

export type FontFamily = Primitive<FontFamilyAttributes>;
