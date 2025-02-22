import { describe, expect, it, vi } from 'vitest';

import {
    DECISION_COLOR_OKLAB_CHROMA_SCALE,
    DECISION_COLOR_OKLAB_CHROMA_VALUE,
    DECISION_COLOR_OKLAB_HUE_SET,
    DECISION_COLOR_OKLAB_HUE_VALUE,
    DECISION_COLOR_OKLAB_LIGHTNESS_SCALE,
    DECISION_COLOR_OKLAB_LIGHTNESS_VALUE,
    DECISION_COLOR_SET,
    DECISION_COLOR_SRGB_HUE_SET,
    DECISION_COLOR_SRGB_HUE_VALUE,
    DECISION_COLOR_SRGB_LIGHTNESS_SCALE,
    DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
    DECISION_COLOR_SRGB_SATURATION_SCALE,
    DECISION_COLOR_SRGB_SATURATION_VALUE,
    DECISION_COLOR_VALUE,
    DECISION_SPACE_SCALE,
    DECISION_SPACE_VALUE,
    DECISION_TYPEFACE_VALUE,
} from '../../constants';
import type { DecisionUnknown } from '../types';

import {
    isColorOklabChromaScaleDecision,
    isColorOklabChromaValueDecision,
    isColorOklabHueSetDecision,
    isColorOklabHueValueDecision,
    isColorOklabLightnessScaleDecision,
    isColorOklabLightnessValueDecision,
    isColorSRGBHueSetDecision,
    isColorSRGBHueValueDecision,
    isColorSRGBLightnessScaleDecision,
    isColorSRGBLightnessValueDecision,
    isColorSRGBSaturationScaleDecision,
    isColorSRGBSaturationValueDecision,
    isColorSetDecision,
    isColorValueDecision,
} from './color';
import { isSpaceScaleDecision, isSpaceValueDecision } from './space';
import { isTypefaceValueDecision } from './typography';

const testCases = [
    {
        name: 'isColorOklabChromaScaleDecision',
        fn: isColorOklabChromaScaleDecision,
        type: DECISION_COLOR_OKLAB_CHROMA_SCALE,
    },
    {
        name: 'isColorOklabChromaValueDecision',
        fn: isColorOklabChromaValueDecision,
        type: DECISION_COLOR_OKLAB_CHROMA_VALUE,
    },
    {
        name: 'isColorOklabHueSetDecision',
        fn: isColorOklabHueSetDecision,
        type: DECISION_COLOR_OKLAB_HUE_SET,
    },
    {
        name: 'isColorOklabHueValueDecision',
        fn: isColorOklabHueValueDecision,
        type: DECISION_COLOR_OKLAB_HUE_VALUE,
    },
    {
        name: 'isColorOklabLightnessScaleDecision',
        fn: isColorOklabLightnessScaleDecision,
        type: DECISION_COLOR_OKLAB_LIGHTNESS_SCALE,
    },
    {
        name: 'isColorOklabLightnessValueDecision',
        fn: isColorOklabLightnessValueDecision,
        type: DECISION_COLOR_OKLAB_LIGHTNESS_VALUE,
    },
    {
        name: 'isColorSRGBHueSetDecision',
        fn: isColorSRGBHueSetDecision,
        type: DECISION_COLOR_SRGB_HUE_SET,
    },
    {
        name: 'isColorSRGBHueValueDecision',
        fn: isColorSRGBHueValueDecision,
        type: DECISION_COLOR_SRGB_HUE_VALUE,
    },
    {
        name: 'isColorSRGBLightnessScaleDecision',
        fn: isColorSRGBLightnessScaleDecision,
        type: DECISION_COLOR_SRGB_LIGHTNESS_SCALE,
    },
    {
        name: 'isColorSRGBLightnessValueDecision',
        fn: isColorSRGBLightnessValueDecision,
        type: DECISION_COLOR_SRGB_LIGHTNESS_VALUE,
    },
    {
        name: 'isColorSRGBSaturationScaleDecision',
        fn: isColorSRGBSaturationScaleDecision,
        type: DECISION_COLOR_SRGB_SATURATION_SCALE,
    },
    {
        name: 'isColorSRGBSaturationValueDecision',
        fn: isColorSRGBSaturationValueDecision,
        type: DECISION_COLOR_SRGB_SATURATION_VALUE,
    },
    {
        name: 'isColorSetDecision',
        fn: isColorSetDecision,
        type: DECISION_COLOR_SET,
    },
    {
        name: 'isColorValueDecision',
        fn: isColorValueDecision,
        type: DECISION_COLOR_VALUE,
    },
    {
        name: 'isSpaceScaleDecision',
        fn: isSpaceScaleDecision,
        type: DECISION_SPACE_SCALE,
    },
    {
        name: 'isSpaceValueDecision',
        fn: isSpaceValueDecision,
        type: DECISION_SPACE_VALUE,
    },
    {
        name: 'isTypefaceValueDecision',
        fn: isTypefaceValueDecision,
        type: DECISION_TYPEFACE_VALUE,
    },
];

testCases.forEach(({ name, fn, type: validType }) => {
    describe(`${name}()`, () => {
        const mockValidDecision = {
            type: vi.fn(() => validType),
        } as unknown as DecisionUnknown;

        const mockInvalidDecision = {
            type: vi.fn(() => 'OTHER_DECISION_TYPE'),
        } as unknown as DecisionUnknown;

        it('should return true for a valid decision type', () => {
            const result = fn(mockValidDecision);
            expect(result).toBe(true);
            expect(mockValidDecision.type).toHaveBeenCalled();
        });

        it('should return false for an invalid decision type', () => {
            const result = fn(mockInvalidDecision);
            expect(result).toBe(false);
            expect(mockInvalidDecision.type).toHaveBeenCalled();
        });
    });
});
