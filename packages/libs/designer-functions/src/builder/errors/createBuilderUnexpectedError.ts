import type { DesignerErrorParams } from '@noodlestan/designer-decisions';

import type { BuilderUnexpectedError } from '../types';

import { ERROR_BUILDER_UNEXPECTED, ERROR_LAYER_BUILDER } from './constants';

type Attributes = DesignerErrorParams<BuilderUnexpectedError>;

export const createBuilderUnexpectedError = (attributes?: Attributes): BuilderUnexpectedError => {
    const { error } = attributes || {};

    const message = () => {
        return `Unexpected Store Error.`;
    };

    const docs = () => {
        return `/api/designer-functions/Builder/Types/BuilderError#${ERROR_BUILDER_UNEXPECTED.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_BUILDER,
        name: ERROR_BUILDER_UNEXPECTED,
        message,
        docs,
        error,
    };
};
