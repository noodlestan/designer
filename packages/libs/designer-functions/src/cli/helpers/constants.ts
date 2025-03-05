import {
    ERROR_BUILDER_OPTIONS,
    ERROR_BUILDER_SOURCE,
    ERROR_BUILDER_UNEXPECTED,
} from '../../builder';

export const NEW_LINE = ' {}\n';

export const ERROR_DOCS_BASE_URL = 'https://designer-decisions.noodlestan.org/';

export const ERROR_DOCS_PATH: Record<string, string> = {
    [ERROR_BUILDER_OPTIONS]:
        '/api/designer-functions/Builder/Types/BuilderError#builderoptionserror',
    [ERROR_BUILDER_UNEXPECTED]:
        '/api/designer-functions/Builder/Types/BuilderError#builderunexpectederror',
    [ERROR_BUILDER_SOURCE]: '/api/designer-functions/Builder/Types/BuilderError#buildersourceerror',
};
