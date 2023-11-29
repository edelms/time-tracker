import { For, Show, createMemo, createSignal } from "solid-js";
import clsx from "clsx";

import { useProjectStore } from "@data/project/context";
import { Project } from "@data/project/types";
import { t } from "@/i18n";

import { TextInput } from "./TextInput";
import { ProjectCreator } from "./ProjectCreator";

type Props = {
    onSelect(projectKey: string): void;
}

export const ProjectBrowser = (props: Props) => {
    const projectStore = useProjectStore();

    const [search, setSearch] = createSignal('');

    const results = createMemo(() => {
        const hasSearch = !!search();
        if (hasSearch)
            return projectStore().find(search());
        else
            return projectStore().recent();
    });

    const hasSearch = () => !!search();

    const handleProjectCreated = (newProject: Project) => {
        props.onSelect(newProject.key);
    }

    return (
        <div class="p-0.5 max-w-lg text-sm">
            <TextInput value={search()} onChange={setSearch} placeholder={t('project.browser.search')} autofocus immediate />

            <div class="flex flex-col gap-3 pt-3 pb-8 px-12">

                <Show when={!hasSearch() && results().length > 0}>
                    <h3 class="text-base tracking-wide text-center text-orange-500 pb-1">
                        {t('project.browser.info.recentlyUsed')}
                    </h3>
                </Show>

                <Show when={hasSearch() && results().length > 0}>
                    <h3 class="text-base tracking-wide text-center text-lime-500 pb-1">
                        {t('project.browser.info.someFound')}
                    </h3>
                </Show>

                <Show when={results().length === 0}>
                    <>
                        <h3 class="text-base tracking-wide text-center text-sky-500 pb-1">
                            {t('project.browser.info.noProjects.message')}<br />
                            {t('project.browser.info.noProjects.createPrompt')}
                        </h3>

                        <ProjectCreator projectKey={search()} onProjectCreated={handleProjectCreated} />
                    </>
                </Show>

                <For each={results()}>
                    {project => (
                        <button onclick={() => props.onSelect(project.key)}
                            class={clsx(
                                "text-left bg-neutral-900/50 hover:bg-neutral-900/75 rounded-md px-4 py-3 w-96 flex flex-col gap-1 border",
                                hasSearch() && 'border-lime-900',
                                !hasSearch() && 'border-orange-900',
                            )}
                        >
                            <div class="text-neutral-300 text-xs border-b border-neutral-600 pb-1 truncate">
                                {project.key}
                            </div>
                            <div class="truncate min-w-0 max-w-full" title={project.name}>
                                {project.name}
                            </div>
                        </button>
                    )}
                </For>
            </div>
        </div>
    );
}
