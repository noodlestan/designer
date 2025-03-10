import type { Decision } from '../../../decision';
import type {
    SRGBHueSet,
    SRGBHueValue,
    SRGBLightnessScale,
    SRGBLightnessValue,
    SRGBSaturationScale,
    SRGBSaturationValue,
} from '../../../values';

export type ColorSRGBHueValueDecision = Decision<SRGBHueValue>;

export type ColorSRGBHueSetDecision = Decision<SRGBHueSet>;

export type ColorSRGBSaturationValueDecision = Decision<SRGBSaturationValue>;

export type ColorSRGBSaturationScaleDecision = Decision<SRGBSaturationScale>;

export type ColorSRGBLightnessValueDecision = Decision<SRGBLightnessValue>;

export type ColorSRGBLightnessScaleDecision = Decision<SRGBLightnessScale>;
