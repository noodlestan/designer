import { type DesignerErrorParams } from '@noodlestan/designer-decisions';

import type { BuilderSourceError } from '../types';

import { ERROR_BUILDER_SOURCE } from './constants';

type Attributes = DesignerErrorParams<BuilderSourceError>;

export const createBuilderSourceError = (attributes: Attributes): BuilderSourceError => {
    const { type, id, source, path, reason } = attributes || {};

    const message = () => {
        const pathStr = path ? ` Path: "${path}"` : '';
        const errorData = ` Data Source: "${JSON.stringify(source)}"`;
        return `Invalid ${type} "${id}". ${reason}${pathStr}${errorData}`;
    };

    return {
        name: ERROR_BUILDER_SOURCE,
        type,
        id,
        source,
        path,
        reason,
        message,
    };
};
