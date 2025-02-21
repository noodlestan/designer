import { describe, expect, it } from 'vitest';

import type { ColorValueExplicitInput } from '../../../inputs';
import { createValueContextMock } from '../../../mocks';

import { createColorValueExplicitModel } from './createColorValueExplicitModel';

describe('createColorValueExplicitModel()', () => {
    const model = createColorValueExplicitModel();

    describe('Given a context and params', () => {
        const [mockContext] = createValueContextMock();
        const params: ColorValueExplicitInput['params'] = {
            value: '#123456',
        };

        it('should create a value', () => {
            const result = model.produce(mockContext, params);

            expect(result.toString('rgb')).toEqual(params.value);
        });
    });
});
