import type { SpaceWithUnits } from '../../inputs';

import type { BaseSet } from './base';
import type { BaseNumericValue, NumberValueOptions } from './number';

export type SpaceValueOptions = NumberValueOptions;

export type SpaceValueFormatOptions = SpaceValueOptions;

export type SpaceValue = BaseNumericValue & {
    toString(options?: SpaceValueFormatOptions): string;
    toObject(options?: SpaceValueFormatOptions): SpaceWithUnits;
};

export type SpaceScale = BaseSet<SpaceValue>;
