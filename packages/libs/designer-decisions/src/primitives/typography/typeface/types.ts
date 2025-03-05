import type { TypefaceObjectLiteral } from '../../../inputs';
import type { Primitive } from '../../../primitive';
import type { Optional } from '../../../private';

export type TypefaceAttributes = Optional<TypefaceObjectLiteral, 'source'>;

export type Typeface = Primitive<TypefaceAttributes>;
