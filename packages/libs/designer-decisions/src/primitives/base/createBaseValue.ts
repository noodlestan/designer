import type { ValueContext } from '../../values';
import type { BaseValueAbstract } from '../types';

export const createBaseValue = (context: ValueContext): BaseValueAbstract => ({
    context: () => context,
});
