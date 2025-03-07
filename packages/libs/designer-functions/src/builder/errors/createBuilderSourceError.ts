import { type DesignerErrorParams } from '@noodlestan/designer-decisions';

import type { BuilderSourceError } from '../types';

import { ERROR_BUILDER_SOURCE, ERROR_LAYER_BUILDER } from './constants';

type Attributes = DesignerErrorParams<BuilderSourceError>;

export const createBuilderSourceError = (attributes: Attributes): BuilderSourceError => {
    const { type, id, source, path, reason } = attributes || {};

    const message = () => {
        const pathStr = path ? ` Path: "${path}"` : '';
        const errorData = ` Data Source: "${JSON.stringify(source)}"`;
        return `Invalid ${type} "${id}". ${reason} ${pathStr}${errorData}`;
    };

    const docs = () => {
        return `/api/designer-functions/Builder/Types/BuilderError#${ERROR_BUILDER_SOURCE.toLowerCase()}`;
    };

    return {
        layer: ERROR_LAYER_BUILDER,
        name: ERROR_BUILDER_SOURCE,
        message,
        docs,
        type,
        id,
        source,
        path,
        reason,
    };
};
