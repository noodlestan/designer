import { describe, expect, it } from 'vitest';

import type { ColorValueExplicitInput } from '../../../inputs';
import { createModelContextMock } from '../../../mocks';
import { COLOR_FORMAT_RGB } from '../../../primitives';

import { createColorValueExplicitModel } from './createColorValueExplicitModel';

describe('createColorValueExplicitModel()', () => {
    const model = createColorValueExplicitModel();

    describe('Given a context and params', () => {
        const params: ColorValueExplicitInput['params'] = {
            value: '#123456',
        };
        const [mockModelContext] = createModelContextMock({ params });

        it('should create a value', () => {
            const result = model.produce(mockModelContext);

            expect(result.toString({ format: COLOR_FORMAT_RGB })).toEqual('#123456');
        });
    });
});
