import { For } from "solid-js";

import { useProjectStore } from "@data/project/context";

import { ProjectItem } from "./ProjectItem";
import { ProjectAdder } from "./ProjectAdder";


export const ProjectList = () => {
    const projectStore = useProjectStore();

    return (
        <div data-testid="project-list" class="flex flex-col gap-3 max-w-3xl mx-auto px-5 py-4">
            <ProjectAdder />

            <For each={projectStore().grouped()}>
                {projectGroup => (
                    <div class="bg-neutral-800 text-white rounded-md text-sm">
                        <div class="px-2 pt-3 pb-1 font-semibold text-neutral-200">{projectGroup.key}</div>
                        <div class="flex flex-col gap-1">
                            <For each={projectGroup.projects}>
                                {project => (
                                    <ProjectItem project={project} />
                                )}
                            </For>
                        </div>
                    </div>
                )}
            </For>
        </div>
    )
}
