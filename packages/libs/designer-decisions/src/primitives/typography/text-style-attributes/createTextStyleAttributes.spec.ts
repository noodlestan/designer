import { describe, expect, it } from 'vitest';

import type { TextStyleAttributesLiteral } from '../../../inputs';
import { createPrimitiveContextMock } from '../../../mocks';

import { TEXT_STYLE_ATTRIBUTES_FALLBACK } from './constants';
import { createTextStyleAttributes } from './createTextStyleAttributes';

describe('createTextStyleAttributes()', () => {
    describe('Given an input', () => {
        const textStyleInput: TextStyleAttributesLiteral = {
            fontStyle: 'italic',
            textTransform: 'uppercase',
        };

        const [primitiveContext] = createPrimitiveContextMock(textStyleInput);
        const textStyle = createTextStyleAttributes(primitiveContext);

        it('should expose the default attributes', () => {
            expect(textStyle.fontStyle).toEqual('italic');
            expect(textStyle.textTransform).toEqual('uppercase');
        });

        it('should expose a string with the attributes', () => {
            const result = textStyle.toString();
            expect(result).toBe('italic uppercase');
        });

        it('should expose a literal with all the properties', () => {
            const literal = textStyle.literal();
            expect(literal).toEqual(textStyleInput);
        });
    });

    describe('Given an empty input', () => {
        const textStyleInput = undefined;
        const [primitiveContext] = createPrimitiveContextMock(textStyleInput);
        const textStyle = createTextStyleAttributes(primitiveContext);

        it('should expose the fallback value', () => {
            expect(textStyle.literal()).toEqual(TEXT_STYLE_ATTRIBUTES_FALLBACK);
        });
    });

    describe('Given a TextStyleInput with invalid style', () => {
        const textStyleInput = {
            fontStyle: 'foo',
            textTransform: 'uppercase',
        } as unknown as TextStyleAttributesLiteral;

        const [primitiveContext] = createPrimitiveContextMock(textStyleInput);
        const textStyle = createTextStyleAttributes(primitiveContext);

        it('should ignore the style attribute', () => {
            expect(textStyle.literal()).toEqual({ textTransform: 'uppercase' });
        });
    });

    describe('Given a TextStyleInput with invalid transform', () => {
        const textStyleInput = {
            fontStyle: 'italic',
            textTransform: 'bar',
        } as unknown as TextStyleAttributesLiteral;

        const [primitiveContext] = createPrimitiveContextMock(textStyleInput);
        const textStyle = createTextStyleAttributes(primitiveContext);

        it('should ignore the transform attribute', () => {
            expect(textStyle.literal()).toEqual({ fontStyle: 'italic' });
        });
    });
});
