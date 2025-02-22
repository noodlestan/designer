import type { SetItems } from '../../primitives';
import type { BaseValue } from '../value';

export type BaseSet<T> = BaseValue<SetItems<T>>;
