import {
    DESIGNER_INTEGRATION_DOCS,
    DESIGNER_INTEGRATION as NAME,
    STARLIGHT_INTEGRATION_NAME,
} from '../private';

export const E_MISSING_STARLIGHT = 0;
export const E_INTREGRATION_ORDER = 1;
export const E_INTREGRATION_NOT_DETECTED = 2;

const DOCS = `Docs: ${DESIGNER_INTEGRATION_DOCS}`;

const message = (code: number): (string | undefined)[] => {
    switch (code) {
        case E_MISSING_STARLIGHT:
            return [STARLIGHT_INTEGRATION_NAME, 'not detected.', DOCS];
        case E_INTREGRATION_ORDER:
            return [STARLIGHT_INTEGRATION_NAME, 'must be place before', NAME, DOCS];
        case E_INTREGRATION_NOT_DETECTED:
            return [
                NAME,
                'not detected.',
                DOCS,
                'Note: Make sure it is added to Astro config and that this API is not being called before the "astro:config:setup" hook is finished.',
            ];
    }
    return ['Unexpected error'];
};

export function throwIntegrationError(code: number): void {
    const msg = message(code).filter(Boolean).join(' ');
    throw new Error(`${NAME}: ${msg}`);
}
