import { TbSelect } from "solid-icons/tb";
import { Show, createSignal } from "solid-js";
import { ProjectBrowser } from "./ProjectBrowser";
import clsx from "clsx";

import { useRecentProjectStore } from "@data/recent-project/context";
import { t } from "@/i18n";

type Props = {
    projectKey: string;
    onChange(projectKey: string): void;
    class?: string;
}

export const ProjectPicker = (props: Props) => {
    const recentProjectStore = useRecentProjectStore();

    let dialog: HTMLDialogElement | undefined;

    const [showDialogContent, setShowDialogContent] = createSignal(false);

    const handleOpen = () => {
        setShowDialogContent(true);
        dialog?.showModal();
    }

    const handleClose = () => {
        dialog?.close();
        setShowDialogContent(false);
    }

    const handleChange = (projectKey: string) => {
        handleClose();
        props.onChange(projectKey);
        recentProjectStore().add(projectKey);
    }

    return (
        <div class={clsx("flex items-center justify-between", props.class)}>
            <span class={clsx(
                props.projectKey && '',
                !props.projectKey && 'text-neutral-500',
            )}>
                {props.projectKey || t('project.empty')}
            </span>

            <button type='button' onclick={handleOpen} title={t('form.alt.selectProject')}
                class="text-slate-300 hover:bg-white/20 p-1 rounded-md"
            >
                <TbSelect />
            </button>

            <dialog ref={dialog} onclick={handleClose} onClose={handleClose}
                class="bg-neutral-800 text-neutral-200 shadow-lg mt-10 mb-auto backdrop:bg-gray-700/50 rounded-md"
            >
                <div onclick={e => e.stopPropagation()}>
                    <Show when={showDialogContent()}>
                        <ProjectBrowser onSelect={handleChange} />
                    </Show>
                </div>
            </dialog>
        </div>
    );
}
