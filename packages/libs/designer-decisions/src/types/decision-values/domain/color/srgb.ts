import type {
    SRGBHueSet,
    SRGBHueValue,
    SRGBLightnessScale,
    SRGBLightnessValue,
    SRGBSaturationScale,
    SRGBSaturationValue,
} from '../../../primitive-values';
import type { Decision } from '../../base';

export type ColorSRGBHueValueDecision = Decision<SRGBHueValue>;

export type ColorSRGBHueScaleDecision = Decision<SRGBHueSet>;

export type ColorSRGBSaturationValueDecision = Decision<SRGBSaturationValue>;

export type ColorSRGBSaturationScaleDecision = Decision<SRGBSaturationScale>;

export type ColorSRGBLightnessValueDecision = Decision<SRGBLightnessValue>;

export type ColorSRGBLightnessScaleDecision = Decision<SRGBLightnessScale>;
