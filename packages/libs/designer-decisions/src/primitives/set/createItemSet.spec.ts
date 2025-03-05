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

        it('should return the item() at a given index', () => {
            const result = set.item(2);
            expect(result).toBe(3);
        });

        it('should return the first() item', () => {
            const result = set.first();
            expect(result).toBe(1);
        });

        it('should return the last() item', () => {
            const result = set.last();
            expect(result).toBe(4);
        });

        it('should return undefined if the index is out of bounds', () => {
            const result = set.item(10);
            expect(result).toBeUndefined();
        });
    });
});
