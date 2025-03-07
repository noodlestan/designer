import { type DesignerErrorParams, serializeErrorData } from '../../errors';
import { formatErrorStr, formatRefAndSource } from '../../private';
import type { ValueInputError } from '../types';

import { ERROR_LAYER_VALUE, ERROR_VALUE_INPUT } from './constants';

type Attributes = DesignerErrorParams<ValueInputError>;

export const createValueInputError = (attributes: Attributes): ValueInputError => {
    const { context, valueName, input, error: maybeError } = attributes;

    const ref = context.ref();
    const recordZero = context.decisionContext().records()[0];
    const { source = { name: '<unknown>' }, file: filename } = recordZero || {};

    const message = (showRef = true, showSource = true) => {
        const atStr = formatRefAndSource(ref, source?.name, filename, showRef, showSource);
        const dataStr = serializeErrorData(input);
        const errStr = formatErrorStr(maybeError as Error);
        return `Invalid Value Input for ${valueName}.${errStr} Value: ${dataStr}${atStr}`;
    };

    const docs = () => {
        return `/api/designer-decisions/Value/Types/ValueError#${ERROR_VALUE_INPUT.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_VALUE,
        name: ERROR_VALUE_INPUT,
        message,
        docs,
        ...attributes,
    };
};
