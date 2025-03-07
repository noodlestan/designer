import type { DesignerErrorParams } from '../../errors';
import { formatRefAndSource } from '../../private';
import type { ValueRefIndexError } from '../types';

import { ERROR_LAYER_VALUE, ERROR_VALUE_REF_INDEX } from './constants';

type Attributes = DesignerErrorParams<ValueRefIndexError>;

export const createValueRefIndexError = (attributes: Attributes): ValueRefIndexError => {
    const { context, valueName, ref: brokenRef } = attributes;

    const ref = context.ref();
    const recordZero = context.decisionContext().records()[0];
    const { source = { name: '<unknown>' }, file: filename } = recordZero || {};

    const message = (showRef = true, showSource = true) => {
        const atStr = formatRefAndSource(ref, source?.name, filename, showRef, showSource);
        const refStr = JSON.stringify(brokenRef);
        return `Ref Index Out of Bounds resolving ${valueName}. Index in ref ${refStr} does exist in the target.${atStr}`;
    };

    const docs = () => {
        return `/api/designer-decisions/Value/Types/ValueError#${ERROR_VALUE_REF_INDEX.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_VALUE,
        name: ERROR_VALUE_REF_INDEX,
        message,
        docs,
        ...attributes,
    };
};
