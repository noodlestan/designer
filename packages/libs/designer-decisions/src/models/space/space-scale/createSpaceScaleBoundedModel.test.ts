import { describe, expect, it } from 'vitest';

import type { SpaceScaleBoundedInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createSpaceScaleBoundedModel } from './createSpaceScaleBoundedModel';

describe('createSpaceScaleBoundedModel()', () => {
    const model = createSpaceScaleBoundedModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const expectedLength = 3;
        const params: SpaceScaleBoundedInput['params'] = {
            from: 10,
            to: 12.25,
            steps: expectedLength - 2,
        };

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockContext, params);

            expect(result).toBeDefined();
            expect(result.get().items()).toHaveLength(expectedLength);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().first()?.toString()).toEqual(params.from + 'px');
            expect(result.get().item(1)?.toString()).toEqual('11.2px');
            expect(result.get().last()?.toString()).toEqual('12.3px');
        });
    });

    describe('Given a quantize param', () => {
        const [mockContext] = createValueContextMock();
        const params: SpaceScaleBoundedInput['params'] = {
            from: 10,
            to: 12.25,
            steps: 1,
            quantize: 2,
        };

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockContext, params);

            expect(result.get().item(1)?.toString()).toEqual('12px');
        });
    });
});
