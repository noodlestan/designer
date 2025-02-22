import type {
    ColorFormat,
    ColorObjectLiteral,
    ColorOklabChromaInput,
    ColorOklabHueInput,
    ColorOklabLightnessInput,
    ColorSRGBHueInput,
    ColorSRGBLightnessInput,
    ColorSRGBSaturationInput,
} from '../../../../../inputs';
import type { ColorChannelName } from '../../../../primitives';

export type ColorChannelInput =
    | ColorSRGBHueInput
    | ColorSRGBSaturationInput
    | ColorSRGBLightnessInput
    | ColorOklabLightnessInput
    | ColorOklabChromaInput
    | ColorOklabHueInput;

export type ColorChannelDefinition = {
    valueName: string;
    channelName: ColorChannelName;
    colorFormat: ColorFormat;
    channelKey: keyof ColorObjectLiteral;
    base: number;
    quant: number;
    fallback: number;
    decisionTypes: {
        value: string;
        set: string;
    };
};
