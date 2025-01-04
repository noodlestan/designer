import type { SpaceWithUnits } from '../decision-inputs';

import type { BaseSet, BaseValue } from './base';

export type SpaceValue = BaseValue<string> & {
    getValueWithUnits(): SpaceWithUnits;
};

export type SpaceScale = BaseSet<SpaceValue>;

// export type SpaceClampedValue = {
//     getValueAtViewportWidth(vw: number): { value: number; units: string };
//     getValueString(): string;
// };
