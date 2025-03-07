import type { DesignerErrorParams } from '@noodlestan/designer-decisions';

import type { BuilderSchemaError } from '../types';

import { ERROR_BUILDER_SCHEMA, ERROR_LAYER_BUILDER } from './constants';

type Attributes = DesignerErrorParams<BuilderSchemaError>;

export const createBuilderSchemaError = (attributes: Attributes): BuilderSchemaError => {
    const { id, reason } = attributes || {};

    const message = () => {
        return `Invalid schema "${id}". ${reason}`;
    };

    const docs = () => {
        return `/api/designer-functions/Builder/Types/BuilderError#${ERROR_BUILDER_SCHEMA.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_BUILDER,
        name: ERROR_BUILDER_SCHEMA,
        message,
        docs,
        id,
        reason,
    };
};
