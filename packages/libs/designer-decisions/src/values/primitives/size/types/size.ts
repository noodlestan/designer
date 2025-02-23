import type { SizeAbsoluteUnits } from '../../../../inputs';

export type Size = {
    value: number;
    units: SizeAbsoluteUnits;
    toString: () => string;
};
