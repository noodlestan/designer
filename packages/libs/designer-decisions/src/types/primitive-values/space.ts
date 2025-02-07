import type { SpaceWithUnits } from '../decision-inputs';

import type { BaseSet } from './base';
import type { BaseNumericValue, NumberValueOptions } from './number';

export type SpaceValueOptions = NumberValueOptions;

export type SpaceValueFormattingOptions = SpaceValueOptions;

export type SpaceValue = BaseNumericValue & {
    getString(options?: SpaceValueFormattingOptions): string;
    getObject(options?: SpaceValueFormattingOptions): SpaceWithUnits;
};

export type SpaceScale = BaseSet<SpaceValue>;
