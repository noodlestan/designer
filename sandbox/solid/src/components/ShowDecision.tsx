import type { DecisionInput, DecisionUnknown, TypefaceValue } from '@noodlestan/designer-decisions';
import { ReactiveStore } from '@noodlestan/designer-signals';
import type { Component, JSX } from 'solid-js/types';

type Props = {
    store: ReactiveStore;
    d: DecisionUnknown;
};

export const ShowDecision: Component<Props> = props => {
    const decisionContext = () => props.d.context();
    const value = () => props.d.produce();
    const errors = () => value().context().allErrors().length;

    const handleInput: JSX.EventHandlerUnion<HTMLInputElement, InputEvent> = event => {
        const target = event.target as HTMLInputElement;
        const v = target?.value || '';

        const input = value().context().input() as DecisionInput;
        const newInput = {
            ...input,
            params: {
                value: { fontName: v },
            },
        };
        const uuid = value().context().decisionContext().uuid();
        const currentTime = performance.now();
        props.store.updateRecord(uuid, newInput);
        console.info(performance.now() - currentTime);
    };

    const inputValue = (): string => typeof value().context().input();

    return (
        <>
            <input type="text" onInput={handleInput} value={inputValue()} />
            <p>name: {props.d.name()}</p>
            <p>errors? {decisionContext().hasErrors() ? '!' : ''}</p>
            <p>type: {value().type()}</p>
            <p>fontName: {(value() as TypefaceValue).get()?.literal().fontName}</p>
            <p>errors?: {errors()}</p>
        </>
    );
};
