import type { DesignerErrorParams } from '../../errors';
import { ERROR_DECISION_NOT_FOUND, ERROR_LAYER_DECISION } from '../constants';
import type { DecisionNotFoundError } from '../types';

type Attributes = DesignerErrorParams<DecisionNotFoundError>;

export function createDecisionNotFoundError(attributes: Attributes): DecisionNotFoundError {
    const { ref } = attributes;

    const message = () => {
        const refStr = JSON.stringify(ref);
        return `Decision Not Found ${refStr}.`;
    };

    const docs = () => {
        return `/api/designer-decisions/Decision/Types/DecisionError#${ERROR_DECISION_NOT_FOUND.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_DECISION,
        name: ERROR_DECISION_NOT_FOUND,
        message,
        docs,
        ...attributes,
    };
}
