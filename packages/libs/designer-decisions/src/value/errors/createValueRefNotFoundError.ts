import type { DesignerErrorParams } from '../../errors';
import { formatRefAndSource } from '../../private';
import type { ValueRefNotFoundError } from '../types';

import { ERROR_LAYER_VALUE, ERROR_VALUE_REF_NOT_FOUND } from './constants';

type Attributes = DesignerErrorParams<ValueRefNotFoundError>;

export function createValueRefNotFoundError(attributes: Attributes): ValueRefNotFoundError {
    const { context, valueName, ref: brokenRef } = attributes;

    const ref = context.ref();
    const recordZero = context.decisionContext().records()[0];
    const { source = { name: '<unknown>' }, file: filename } = recordZero || {};

    const message = (showRef = true, showSource = true) => {
        const atStr = formatRefAndSource(ref, source?.name, filename, showRef, showSource);
        const refStr = JSON.stringify(brokenRef);
        return `Ref Not Found resolving ${valueName}. Unknown ${refStr}.${atStr}`;
    };

    const docs = () => {
        return `/api/designer-decisions/Value/Types/ValueError#${ERROR_VALUE_REF_NOT_FOUND.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_VALUE,
        name: ERROR_VALUE_REF_NOT_FOUND,
        message,
        docs,
        ...attributes,
    };
}
