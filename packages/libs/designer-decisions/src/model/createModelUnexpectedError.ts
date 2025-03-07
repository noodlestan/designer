import { type DesignerErrorParams, serializeErrorData } from '../errors';
import { formatErrorStr, formatRefAndSource } from '../private';
import { UnknownDecisionModelError, UnknownDecisionTypeError } from '../store';

import { ERROR_LAYER_MODEL, ERROR_MODEL_UNEXPECTED } from './constants';
import type { ModelUnexpectedError } from './types';

type Attributes = DesignerErrorParams<ModelUnexpectedError>;

export const createModelUnexpectedError = (attributes: Attributes): ModelUnexpectedError => {
    const { context, input, error: maybeError } = attributes;

    const ref = context.ref();
    const recordZero = context.decisionContext().records()[0];
    const { source = { name: '<unknown>' }, file: filename } = recordZero || {};

    const isWellKnown =
        maybeError instanceof UnknownDecisionTypeError ||
        maybeError instanceof UnknownDecisionModelError;
    const error = isWellKnown ? undefined : maybeError;

    const message = (showRef = true, showSource = true) => {
        const prefix = isWellKnown ? maybeError.message : 'Unexpected Model Error.';
        const dataStr = serializeErrorData(input);
        const atStr = formatRefAndSource(ref, source?.name, filename, showRef, showSource);
        const errStr = !isWellKnown ? formatErrorStr(maybeError as Error) : '';
        return `${prefix}${errStr} Value: ${dataStr}${atStr}`;
    };

    const docs = () => {
        return `/api/designer-decisions/Model/Types/ModelError#${ERROR_MODEL_UNEXPECTED.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_MODEL,
        name: ERROR_MODEL_UNEXPECTED,
        message,
        docs,
        ...attributes,
        error,
    };
};
