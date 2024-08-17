import { JSX } from "solid-js"

type Props = {
    children: JSX.Element | JSX.Element[];
}

export const InputGroup = (props: Props) => {
    return (
        <div data-testid="input-group" class="flex bg-neutral-700 text-white rounded-md px-1 py-1 gap-1">
            {props.children}
        </div>
    );
}
