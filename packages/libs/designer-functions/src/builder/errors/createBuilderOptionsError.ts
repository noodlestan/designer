import { type DesignerErrorParams, serializeErrorData } from '@noodlestan/designer-decisions';

import type { BuilderOptionsError } from '../types';

import { ERROR_BUILDER_OPTIONS, ERROR_LAYER_BUILDER } from './constants';

type Attributes = DesignerErrorParams<BuilderOptionsError>;

export const createBuilderOptionsError = (attributes: Attributes): BuilderOptionsError => {
    const { path, reason, options } = attributes || {};

    const message = () => {
        return `Invalid BuilderOptions: ${path} ${reason} ${serializeErrorData(options)}`;
    };

    const docs = () => {
        return `/api/designer-functions/Builder/Types/BuilderError#${ERROR_BUILDER_OPTIONS.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_BUILDER,
        name: ERROR_BUILDER_OPTIONS,
        message,
        docs,
        path,
        reason,
        options,
    };
};
