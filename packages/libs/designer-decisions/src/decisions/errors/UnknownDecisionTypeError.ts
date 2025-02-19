export class UnknownDecisionTypeError extends Error {
    constructor(type: string) {
        const message = `Unknown decision type "${type}".`;
        super(message);
        this.name = 'UnknownDecisionTypeError';
    }
}
