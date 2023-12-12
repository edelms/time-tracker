import clsx from "clsx";
import { JSX } from "solid-js";

type Props = {
    icon?: JSX.Element;
    label?: string;
    title?: string;
    type?: 'button' | 'submit';
    variant?: 'default' | 'success' | 'danger';
    class?: string;
    testId?: string;
    onClick?(): void;
}

export const Button = (props: Props) => {

    const variant = () => props.variant || 'default';
    const type = () => props.type || 'button';

    const handleClick = (e: Event) => {
        e.preventDefault();
        props.onClick?.();
    }

    return (
        <button role="button" data-testid={props.testId} type={type()} onClick={handleClick} title={props.title}
            class={clsx(
                "px-2 py-1 text-sm rounded-sm flex gap-1 items-center",
                variant() === 'default' && 'bg-neutral-800/50',
                variant() === 'success' && 'bg-emerald-700/50',
                variant() === 'danger' && 'bg-rose-700/50',
                props.class
            )}
        >
            <span class="text-base opacity-80">{props.icon}</span>
            <span class="text-xs">{props.label}</span>
        </button>
    );
}
