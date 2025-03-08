import { describe, expect, it } from 'vitest';

import type { SizeScaleBoundedInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createSizeScaleBoundedModel } from './createSizeScaleBoundedModel';

describe('createSizeScaleBoundedModel()', () => {
    const model = createSizeScaleBoundedModel();

    describe('Given a context and params', () => {
        const expectedLength = 3;
        const params: SizeScaleBoundedInput['params'] = {
            from: 10,
            to: 12.25,
            steps: expectedLength - 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a scale of the expected size', () => {
            const result = model.produce(mockModelContext);

            expect(result).toBeDefined();
            expect(result.items()).toHaveLength(expectedLength);
        });

        it('should populate the scale with values based on clamped params', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toString()).toEqual('10px');
            expect(result.item(1)?.toString()).toEqual('11.13px');
            expect(result.last()?.toString()).toEqual('12.25px');
        });
    });

    describe('Given a quantize param', () => {
        const params: SizeScaleBoundedInput['params'] = {
            from: {
                value: 10,
                unit: 'rem',
            },
            to: 12.25,
            steps: 1,
            quantize: 2,
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should populate the set with quantized values', () => {
            const result = model.produce(mockModelContext);

            expect(result.first()?.toString()).toEqual('10rem');
            expect(result.item(1)?.toString()).toEqual('12rem');
            expect(result.last()?.toString()).toEqual('12rem');
        });
    });
});
