import clsx from "clsx";
import { Show, createEffect } from "solid-js";

type Props = {
    value: string;
    onChange?(newValue: string): void;
    placeholder?: string;
    label?: string;
    id?: string;
    autofocus?: boolean;
    immediate?: boolean;

    showValidation?: boolean;
    validationError?: string;
}

export const TextInput = (props: Props) => {
    let inputRef: HTMLInputElement | undefined;

    createEffect(() => {
        inputRef?.setCustomValidity(props.validationError || '');
    })


    return (
        <label class="flex-1 flex flex-col gap-1 relative">

            {props.label && (
                <span class="text-opacity-70 text-white px-3">{props.label}</span>
            )}

            <input ref={inputRef} type='text'
                placeholder={props.placeholder} id={props.id} autofocus={props.autofocus}
                value={props.value}
                onChange={!props.immediate ? (e => props.onChange?.(e.currentTarget.value)) : undefined}
                onInput={props.immediate ? (e => props.onChange?.(e.currentTarget.value)) : undefined}
                class={clsx(
                    'text-sm px-3 py-2 bg-neutral-900/30 text-inherit rounded-sm outline outline-1 outline-transparent placeholder:text-neutral-500',
                    !props.showValidation && 'focus:outline-neutral-600',
                    props.showValidation && 'valid:outline-green-600 invalid:outline-red-600',
                )}
            />

            <Show when={props.showValidation && props.validationError}>
                <div class="text-red-100 text-sm absolute top-full mt-1 bg-neutral-700/90 px-2 py-1 rounded-md">
                    {props.validationError}
                </div>
            </Show>

        </label>
    );
}