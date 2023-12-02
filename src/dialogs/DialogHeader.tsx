import { JSX } from "solid-js";

type Props = {
    text?: string;
    right?: JSX.Element;
}

export const DialogHeader = (props: Props) => {
    return (
        <h3 class="text-base px-4 py-2 border-b border-neutral-500 flex items-center justify-between">
            <span>{props.text}</span>
            {props.right}
        </h3>
    );
}
