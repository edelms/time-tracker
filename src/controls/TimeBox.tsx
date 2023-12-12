import { onMount } from "solid-js";
import clsx from "clsx";

import { formatTime, parseTime } from "../helpers/time";
import { t } from "@/i18n";

type Props = {
    value: number;
    onChange?(newValue: number): void;
    autofocus?: boolean;
    placeholder?: string;
    class?: string;
}

export const TimeBox = (props: Props) => {

    let input: HTMLInputElement | undefined;

    const handleChange = (value: string) => {
        const parsedTime = parseTime(value);
        if (!isNaN(parsedTime)) {
            if (input) {
                input.setCustomValidity('');
                input.value = formatTime(parsedTime);
            }
            props.onChange?.(parsedTime);
        } else {
            input?.setCustomValidity(t('form.time.parseError')!);
        }
    }

    const handleFocus = () => {
        if (input)
            input.setSelectionRange(0, 10);
    }

    onMount(() => {
        setTimeout(() => {
            if (props.autofocus)
                input?.focus();
        }, 50);
    })

    return (
        <input data-testid="time-box" ref={input} type='text' value={formatTime(props.value)} size={1}
            placeholder={props.placeholder}
            onchange={e => handleChange(e.currentTarget.value)}
            onfocus={handleFocus}
            class={clsx(
                "bg-neutral-900/50 text-inherit w-auto min-w-0 px-2 py-1 text-center rounded-sm outline outline-1 outline-transparent invalid:outline-red-600",
                props.class
            )}
        />
    );

}
