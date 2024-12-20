import type { SpaceWithUnitsInput } from '../decision-inputs';

import type { BaseValue } from './base';

export type SpaceValue = BaseValue<string> & {
    getValueWithUnits(): SpaceWithUnitsInput;
};

export type SpaceScale = BaseValue<SpaceValue[]>;

// export type SpaceClampedValue = {
//     getValueAtViewportWidth(vw: number): { value: number; units: string };
//     getValueString(): string;
// };
