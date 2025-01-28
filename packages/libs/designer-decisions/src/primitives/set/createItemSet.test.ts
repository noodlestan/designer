import { describe, expect, it } from 'vitest';

import { createItemSet } from './createItemSet';

describe('createItemSet()', () => {
    describe('Given an array of items', () => {
        const items = [1, 2, 3, 4];
        const set = createItemSet(items);

        it('should return the same array when accessing items()', () => {
            const result = set.items();
            expect(result).toEqual(items);
        });

        it('should return the correct item at a given index using item()', () => {
            const result = set.item(2);
            expect(result).toBe(3);
        });

        it('should return undefined if the index is out of bounds', () => {
            const result = set.item(10);
            expect(result).toBeUndefined();
        });
    });
});
