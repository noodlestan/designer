import type { Decision } from '../../../decision';
import type {
    OklabChromaScale,
    OklabChromaValue,
    OklabHueSet,
    OklabHueValue,
    OklabLightnessScale,
    OklabLightnessValue,
} from '../../../values';

export type ColorOklabLightnessValueDecision = Decision<OklabLightnessValue>;

export type ColorOklabLightnessScaleDecision = Decision<OklabLightnessScale>;

export type ColorOklabChromaValueDecision = Decision<OklabChromaValue>;

export type ColorOklabChromaScaleDecision = Decision<OklabChromaScale>;

export type ColorOklabHueValueDecision = Decision<OklabHueValue>;

export type ColorOklabHueSetDecision = Decision<OklabHueSet>;
