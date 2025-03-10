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
    DECISION_FONT_SIZE_VALUE,
    DECISION_FONT_WEIGHT_VALUE,
    DECISION_LETTER_SPACING_VALUE,
    DECISION_LINE_HEIGHT_VALUE,
    DECISION_SIZE_SCALE,
    DECISION_SIZE_VALUE,
    DECISION_TYPEFACE_VALUE,
} from '../constants';
import type { DecisionUnknown } from '../decision';

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
import { isSizeScaleDecision, isSizeValueDecision } from './space';
import {
    isFontSizeValueDecision,
    isFontWeightValueDecision,
    isLetterSpacingValueDecision,
    isLineHeightValueDecision,
    isTypefaceValueDecision,
} from './typography';

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
        name: 'isSizeScaleDecision',
        fn: isSizeScaleDecision,
        type: DECISION_SIZE_SCALE,
    },
    {
        name: 'isSizeValueDecision',
        fn: isSizeValueDecision,
        type: DECISION_SIZE_VALUE,
    },
    {
        name: 'isTypefaceValueDecision',
        fn: isTypefaceValueDecision,
        type: DECISION_TYPEFACE_VALUE,
    },
    {
        name: 'isTypefaceValueDecision',
        fn: isFontSizeValueDecision,
        type: DECISION_FONT_SIZE_VALUE,
    },
    {
        name: 'isTypefaceValueDecision',
        fn: isFontWeightValueDecision,
        type: DECISION_FONT_WEIGHT_VALUE,
    },
    {
        name: 'isTypefaceValueDecision',
        fn: isLineHeightValueDecision,
        type: DECISION_LINE_HEIGHT_VALUE,
    },
    {
        name: 'isTypefaceValueDecision',
        fn: isLetterSpacingValueDecision,
        type: DECISION_LETTER_SPACING_VALUE,
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
