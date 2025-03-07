import { type DesignerErrorParams, serializeErrorData } from '../../errors';
import { formatErrorStr, formatRefAndSource } from '../../private';
import type { PrimitiveInputError } from '../types';

import { ERROR_LAYER_PRIMTIVE, ERROR_PRIMITIVE_INPUT } from './constants';

type Attributes = DesignerErrorParams<PrimitiveInputError>;

export const createPrimitiveInputError = (attributes: Attributes): PrimitiveInputError => {
    const { context, primitiveName, input, error: maybeError } = attributes;

    const ref = context.valueContext()?.ref();
    const recordZero = context.valueContext()?.decisionContext().records()[0];
    const { source, file: filename } = recordZero || {};

    const message = (showRef = true, showSource = true) => {
        const atStr = formatRefAndSource(ref, source?.name, filename, showRef, showSource);
        const dataStr = serializeErrorData(input);
        const errStr = formatErrorStr(maybeError as Error);
        return `Invalid Primitive Input for ${primitiveName}.${errStr} Value: ${dataStr}${atStr}`;
    };

    const docs = () => {
        return `/api/designer-decisions/Primitive/Types/PrimitiveError#${ERROR_PRIMITIVE_INPUT.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_PRIMTIVE,
        name: ERROR_PRIMITIVE_INPUT,
        message,
        docs,
        ...attributes,
    };
};
