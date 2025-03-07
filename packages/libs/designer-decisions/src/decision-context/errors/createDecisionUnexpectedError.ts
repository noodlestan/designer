import { type DesignerErrorParams } from '../../errors';
import { formatErrorStr, formatRefAndSource } from '../../private';
import { UnknownDecisionModelError } from '../../store/errors/UnknownDecisionModelError';
import { UnknownDecisionTypeError } from '../../store/errors/UnknownDecisionTypeError';
import { ERROR_DECISION_UNEXPECTED, ERROR_LAYER_DECISION } from '../constants';
import type {
    DecisionUnexpectedError,
    DecisionUnknownModelError,
    DecisionUnknownTypeError,
} from '../types';

type Attributes = DesignerErrorParams<DecisionUnexpectedError>;

export const createDecisionUnexpectedError = (
    attributes: Attributes,
): DecisionUnexpectedError | DecisionUnknownTypeError | DecisionUnknownModelError => {
    const { context, error: maybeError } = attributes;

    const recordZero = context.records()[0];
    const { source = { name: '<unknown>' }, file: filename } = recordZero || {};

    const ref = context.ref();

    const isWellKnown =
        maybeError instanceof UnknownDecisionTypeError ||
        maybeError instanceof UnknownDecisionModelError;
    const error = isWellKnown ? undefined : maybeError;

    const message = (showRef = true, showSource = true) => {
        const prefix = isWellKnown ? maybeError.message : 'Unexpected Decision Error.';
        const atStr = formatRefAndSource(ref, source.name, filename, showRef, showSource);
        const errStr = !isWellKnown ? formatErrorStr(maybeError as Error) : '';
        return `${prefix}${errStr}${atStr}`;
    };

    const docs = () => {
        return `/api/designer-decisions/Decision/Types/DecisionError#${ERROR_DECISION_UNEXPECTED.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_DECISION,
        name: ERROR_DECISION_UNEXPECTED,
        message,
        docs,
        error,
        context,
    };
};
