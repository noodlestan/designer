import type {
    ColorFormat,
    ColorObjectLiteral,
    ColorOklabChromaInput,
    ColorOklabHueInput,
    ColorOklabLightnessInput,
    ColorSRGBHueInput,
    ColorSRGBLightnessInput,
    ColorSRGBSaturationInput,
} from '../../../inputs';
import type { ColorValue } from '../../domains';
import type {
    BaseNumericValue,
    ColorChannelName,
    ColorComplementaryChannels,
    NumberValueOptions,
} from '../../primitives';

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

export type ColorChannelBaseOptions = NumberValueOptions;

export type ColorChannelBaseValue<
    C extends ColorComplementaryChannels = ColorComplementaryChannels,
    T extends number = number,
> = BaseNumericValue<T> & {
    channelName: () => ColorChannelName;
    toColor: (channels: C) => ColorValue;
};
