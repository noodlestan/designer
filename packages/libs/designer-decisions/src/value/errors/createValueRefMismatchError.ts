import type { DesignerErrorParams } from '../../errors';
import { formatRefAndSource } from '../../private';
import type { ValueRefMismatchError } from '../types';

import { ERROR_LAYER_VALUE, ERROR_VALUE_REF_MISMATCH } from './constants';

type Attributes = DesignerErrorParams<ValueRefMismatchError>;

export const createValueRefMismatchError = (attributes: Attributes): ValueRefMismatchError => {
    const { context, valueName, ref: brokenRef, decision, accepted } = attributes;

    const ref = context.ref();
    const recordZero = context.decisionContext().records()[0];
    const { source = { name: '<unknown>' }, file: filename } = recordZero || {};

    const message = (showRef = true, showSource = true) => {
        const atStr = formatRefAndSource(ref, source?.name, filename, showRef, showSource);
        const refStr = JSON.stringify(brokenRef);
        const mismatch = `matched "${decision.type()}", expected ${accepted.join(' or ')}`;
        return `Ref Mismatch resolving ${valueName}. Index in ref ${refStr} ${mismatch}.${atStr}`;
    };

    const docs = () => {
        return `/api/designer-decisions/Value/Types/ValueError#${ERROR_VALUE_REF_MISMATCH.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_VALUE,
        name: ERROR_VALUE_REF_MISMATCH,
        message,
        docs,
        ...attributes,
    };
};
