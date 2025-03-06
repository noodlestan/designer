import { beforeEach, describe, expect, it, vi } from 'vitest';

import { createValueContextMock, mockChannelDefinition } from '../../../mocks';
import type { ColorChannelObjectLiteral } from '../../../primitives';

import { resolveColorChannelBaseValue } from './resolveColorChannelBaseValue';
import { resolveColorChannelBaseValueRef } from './resolveColorChannelBaseValueRef';

vi.mock('./resolveColorChannelBaseValueRef');

const resolveColorChannelBaseValueRefMock = vi.mocked(resolveColorChannelBaseValueRef);

describe('resolveColorChannelBaseValue()', () => {
    const channelDef = mockChannelDefinition;

    beforeEach(() => {
        vi.clearAllMocks();
    });

    describe('When input is a DecisionRef', () => {
        const mockInput = { $uuid: 'mock-uuid' };
        const [mockValueContext] = createValueContextMock(mockInput);

        const resolvedValue: ColorChannelObjectLiteral = { value: 0.3 };

        beforeEach(() => {
            resolveColorChannelBaseValueRefMock.mockReturnValue(resolvedValue);
        });

        it('should call resolveColorChannelBaseValueRef with the expected arguments', () => {
            resolveColorChannelBaseValue(channelDef, mockValueContext);

            expect(resolveColorChannelBaseValueRefMock).toHaveBeenCalledOnce();
            expect(resolveColorChannelBaseValueRefMock).toHaveBeenCalledWith(
                channelDef,
                mockValueContext,
                mockInput,
            );
        });

        it('should return the value resolved by resolveColorChannelBaseValueRef', () => {
            const result = resolveColorChannelBaseValue(channelDef, mockValueContext);
            expect(result).toEqual(resolvedValue);
        });
    });

    describe('When input is empty', () => {
        const [mockValueContext] = createValueContextMock();

        it('should return undefined', () => {
            const result = resolveColorChannelBaseValue(channelDef, mockValueContext);
            expect(result).toBeUndefined();
        });
    });

    describe('When input is something else', () => {
        const mockInput = 0.3;
        const [mockValueContext] = createValueContextMock(mockInput);

        it('should return the provided input', () => {
            const result = resolveColorChannelBaseValue(channelDef, mockValueContext);
            expect(result).toEqual(mockInput);
        });
    });
});
