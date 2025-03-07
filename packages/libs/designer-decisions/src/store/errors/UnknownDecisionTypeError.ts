export class UnknownDecisionTypeError extends Error {
    constructor(type: string) {
        const message = `Unknown Decision Type "${type}".`;
        super(message);
        this.name = 'UnknownDecisionTypeError';
    }
}
