import { describe, expect, it } from 'vitest';

import type { SizeObjectLiteral } from '../../../inputs';

import { createSize } from './createSize';

describe('createSize()', () => {
    describe('Given a SizeObjectLiteral', () => {
        const sizeLiteral: SizeObjectLiteral = { value: 32, units: 'px' };
        const size = createSize(sizeLiteral);

        it('should return the expected value', () => {
            expect(size.value).toEqual(32);
            expect(size.units).toEqual('px');
        });

        it('should format toString()', () => {
            expect(size.toString()).toEqual('32px');
        });
    });
});
