import { ERROR_CONFIG_INVALID, ERROR_LAYER_CONFIG } from './constants';
import type { ConfigError } from './types';

type Attributes = Omit<ConfigError, 'message'>;

export const createConfigError = (error: Attributes['error']): ConfigError => {
    const message = () => `Config Error ${error.instancePath} (${error.keyword}) ${error.message}`;

    const docs = () => {
        return `/api/designer-functions/Config/Types/ConfigError#${ERROR_CONFIG_INVALID.toLowerCase()}`;
    };
    return {
        layer: ERROR_LAYER_CONFIG,
        name: ERROR_CONFIG_INVALID,
        message,
        docs,
        error,
    };
};
