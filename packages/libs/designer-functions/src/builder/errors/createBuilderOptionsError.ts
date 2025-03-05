import { type DesignerErrorParams, serializeErrorData } from '@noodlestan/designer-decisions';

import type { BuilderOptionsError } from '../types';

import { ERROR_BUILDER_OPTIONS } from './constants';

type Attributes = DesignerErrorParams<BuilderOptionsError>;

export const createBuilderOptionsError = (attributes: Attributes): BuilderOptionsError => {
    const { path, reason, options } = attributes || {};

    const message = () => {
        return `Invalid BuilderOptions: ${path}. ${reason} ${serializeErrorData(options)}`;
    };

    return {
        name: ERROR_BUILDER_OPTIONS,
        path,
        reason,
        options,
        message,
    };
};
