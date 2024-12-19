import { ColorValue, HueValue, LightnessValue, SaturationValue } from '../primitive-values/color';

export type HueDecision = {
    value: () => HueValue;
};

export type SaturationDecision = {
    value: () => SaturationValue;
};

export type LightnessDecision = {
    value: () => LightnessValue;
};

export type LightnessScaleDecision = {
    value: () => LightnessValue[];
};

export type ColorValueDecision = {
    value: () => ColorValue;
};

export type ColorScaleDecision = {
    value: () => ColorValue[];
};
