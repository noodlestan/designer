import { describe, expect, it } from 'vitest';

import type { DecisionRef } from '../../inputs';
import { createValueContextMock } from '../../mocks';

import { ERROR_LAYER_VALUE, ERROR_VALUE_REF_NOT_FOUND } from './constants';
import { createValueRefNotFoundError } from './createValueRefNotFoundError';

describe('createValueRefNotFoundError()', () => {
    describe('Given context, value name, and ref', () => {
        const [mockValueContext] = createValueContextMock();

        const mockRef: DecisionRef = { $uuid: 'ref-uuid' };
        const valueName = 'foo-value';

        const context = mockValueContext;

        it('should return a ValueRefNotFoundError object with the expected attributes', () => {
            const result = createValueRefNotFoundError({ context, valueName, ref: mockRef });
            expect(result.layer).toBe(ERROR_LAYER_VALUE);
            expect(result.name).toBe(ERROR_VALUE_REF_NOT_FOUND);
            expect(result.context).toBe(mockValueContext);
            expect(result.valueName).toBe(valueName);
            expect(result.ref).toBe(mockRef);
        });

        it('should return a ValueRefNotFoundError object with the expected message', () => {
            const result = createValueRefNotFoundError({ context, valueName, ref: mockRef });
            expect(result.message()).toContain('Ref Not Found resolving foo-value.');
            expect(result.message()).toContain(JSON.stringify(mockValueContext.ref()));
            expect(result.message()).toContain('ref-uuid');
        });
    });
});
