import type { Component, JSX } from 'solid-js';

type Props = {
    children: JSX.Element;
};

export const Text: Component<Props> = props => {
    return <p>{props.children}</p>;
};
