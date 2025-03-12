import { beforeEach, describe, expect, it, vi } from 'vitest';

import type { TextStyleObjectLiteral } from '../../../../inputs';
import { createValueContextMock } from '../../../../mocks';

import { resolveTextStyleValue } from './resolveTextStyleValue';
import { resolveTextStyleValueRef } from './resolveTextStyleValueRef';

vi.mock('./resolveTextStyleValueRef');

const resolveTextStyleValueRefMock = vi.mocked(resolveTextStyleValueRef);

describe('resolveTextStyleValue()', () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const [mockValueContext] = createValueContextMock(mockInput);

        const resolvedValue: TextStyleObjectLiteral = {
            fontName: 'Georgia',
            capabilities: [],
            styles: [],
            ranges: [],
        };

        beforeEach(() => {
            resolveTextStyleValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveTextStyleValueRef with the expected arguments', () => {
            resolveTextStyleValue(mockValueContext);

            expect(resolveTextStyleValueRefMock).toHaveBeenCalledOnce();
            expect(resolveTextStyleValueRefMock).toHaveBeenCalledWith(mockValueContext, mockInput);
        });

        it('should return the value resolved by resolveTextStyleValueRef', () => {
            const result = resolveTextStyleValue(mockValueContext);

            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is empty', () => {
        const [mockValueContext] = createValueContextMock();

        it('should return undefined', () => {
            const result = resolveTextStyleValue(mockValueContext);
            expect(result).toEqual(undefined);
        });
    });

    describe('When input is something else', () => {
        const mockInput: TextStyleObjectLiteral = { fontName: 'Foo' };
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return the provided input', () => {
            const result = resolveTextStyleValue(mockValueContext);
            expect(result).toEqual(mockInput);
        });
    });
});
