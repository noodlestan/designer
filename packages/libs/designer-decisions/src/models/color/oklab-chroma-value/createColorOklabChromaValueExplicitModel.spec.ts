import { describe, expect, it } from 'vitest';

import type { ColorOklabChromaInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';

import { createColorOklabChromaValueExplicitModel } from './createColorOklabChromaValueExplicitModel';

describe('createColorOklabChromaValueExplicitModel()', () => {
    const model = createColorOklabChromaValueExplicitModel();
    const input = 0.1357 as ColorOklabChromaInput;
    const params = { value: input };

    describe('Given a context and params', () => {
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toNumber()).toEqual(0.136);
        });
    });

    describe('Given a quantize param', () => {
        const [mockModelContext] = createModelContextMock({ params: { ...params, quantize: 5 } });

        it('should create a quantized value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toNumber()).toEqual(0.15);
        });
    });
});
