import type { DesignerErrorParams } from '@noodlestan/designer-decisions';

import type { BuilderSchemaError } from '../types';

import { ERROR_BUILDER_SCHEMA } from './constants';

type Attributes = DesignerErrorParams<BuilderSchemaError>;

export const createBuilderSchemaError = (attributes: Attributes): BuilderSchemaError => {
    const { id, reason } = attributes || {};

    const message = () => {
        return `Invalid schema "${id}". ${reason}`;
    };

    return {
        name: ERROR_BUILDER_SCHEMA,
        id,
        reason,
        message,
    };
};
