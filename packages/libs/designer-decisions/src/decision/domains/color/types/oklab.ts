import type {
    OklabChromaScale,
    OklabChromaValue,
    OklabHueSet,
    OklabHueValue,
    OklabLightnessScale,
    OklabLightnessValue,
} from '../../../../values';
import type { Decision } from '../../../types';

export type ColorOklabLightnessValueDecision = Decision<OklabLightnessValue>;

export type ColorOklabLightnessScaleDecision = Decision<OklabLightnessScale>;

export type ColorOklabChromaValueDecision = Decision<OklabChromaValue>;

export type ColorOklabChromaScaleDecision = Decision<OklabChromaScale>;

export type ColorOklabHueValueDecision = Decision<OklabHueValue>;

export type ColorOklabHueSetDecision = Decision<OklabHueSet>;
