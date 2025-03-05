import type { FontWeightObjectLiteral } from '../../../inputs';
import type { Primitive } from '../../../primitive';

export type FontWeight = Primitive<FontWeightObjectLiteral> & {
    toNumber: () => number;
};
