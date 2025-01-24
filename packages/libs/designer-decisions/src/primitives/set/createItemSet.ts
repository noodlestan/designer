import type { SetItems } from '../../types';

export const createItemSet = <T>(items: T[]): SetItems<T> => ({
    items: () => items,
    item: index => items[index],
});
