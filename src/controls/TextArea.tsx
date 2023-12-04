import clsx from "clsx";
import { onMount } from "solid-js";

type Props = {
    value: string;
    onChange?(newValue: string): void;

    placeholder?: string;
    class?: string;
}

export const TextArea = (props: Props) => {

    let textarea: HTMLTextAreaElement | undefined;

    const handleChange = (newValue: string) => {
        props.onChange?.(newValue);
    }

    const autogrow = () => {
        if (textarea) {
            textarea.style.height = '5px';
            textarea.style.height = textarea.scrollHeight + 'px';
        }
    }

    onMount(() => autogrow());

    return (
        <textarea ref={textarea} placeholder={props.placeholder} oninput={autogrow}
            value={props.value} onchange={e => handleChange(e.currentTarget.value)}
            class={clsx(
                "bg-transparent text-inherit border-none w-full px-2 py-1 resize-none placeholder:text-neutral-500",
                props.class
            )}
        />
    );
}
