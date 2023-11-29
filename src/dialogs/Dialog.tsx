import { JSX, Show, createEffect } from "solid-js";

type Props = {
    show: boolean;
    onClose(show: boolean): void;

    children: JSX.Element | JSX.Element[];
}

export const Dialog = (props: Props) => {

    let dialog: HTMLDialogElement | undefined;

    createEffect(() => {
        if (props.show && !dialog?.open)
            dialog?.showModal();
        else if (!props.show && dialog?.open)
            dialog?.close();
    });

    const handleClose = () => {
        dialog?.close();
        props.onClose(false);
    }

    return (
        <dialog ref={dialog} onclick={handleClose} onClose={handleClose}
            class="text-sm bg-neutral-800 text-neutral-200 shadow-lg mt-10 mb-auto backdrop:bg-gray-700/50 rounded-md"
        >
            <div onclick={e => e.stopPropagation()}>
                <Show when={props.show}>
                    {props.children}
                </Show>
            </div>
        </dialog>
    );
}
