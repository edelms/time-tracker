import { createEffect, createSignal } from "solid-js";

import { Project } from "@data/project/types";
import { useProjectStore } from "@data/project/context";
import { t } from "@/i18n";

import { TextInput } from "./TextInput";
import { Button } from "./Button";


type Props = {
    projectKey: string;
    onProjectCreated(project: Project): void;
}

export const ProjectCreator = (props: Props) => {
    const projectStore = useProjectStore();

    const [projectKey, setProjectKey] = createSignal(props.projectKey.toUpperCase());
    const [projectName, setProjectName] = createSignal('');

    const [projectKeyError, setProjectKeyError] = createSignal('');
    const [projectNameError, setProjectNameError] = createSignal('');

    createEffect(() => {
        setProjectKey(props.projectKey.toUpperCase());
    })

    const handleCreate = (e?: Event) => {
        e?.preventDefault();

        if (!projectKey())
            setProjectKeyError(t('form.project.key.requiredError')!);
        else
            setProjectKeyError('');
        if (!projectName())
            setProjectNameError(t('form.project.name.requiredError')!);
        else
            setProjectNameError('');

        if (projectKeyError() || projectNameError())
            return;

        if (projectStore().isKeyInUse(projectKey())) {
            setProjectKeyError(t('form.project.key.inUseError')!);
            return;
        }

        const newProject = projectStore().add(projectKey(), projectName());
        props.onProjectCreated(newProject);
    }

    return (
        <form data-testid="project-creator" onsubmit={handleCreate} class="flex flex-col gap-3 px-5 py-3 w-96 border border-sky-900 rounded-md">
            <TextInput value={projectKey()} onChange={setProjectKey} label={t('form.project.key.label')} placeholder={t('form.project.key.label')}
                showValidation={!!projectKeyError() || !!projectNameError()}
                validationError={projectKeyError()}
                testId="key-input"
            />
            <TextInput value={projectName()} onChange={setProjectName} label={t('form.project.name.label')} placeholder={t('form.project.name.label')}
                showValidation={!!projectKeyError() || !!projectNameError()}
                validationError={projectNameError()}
                testId="name-input"
            />
            <div class="flex justify-end">
                <Button type="submit" label={t('form.button.add')} variant="success" onClick={handleCreate} />
            </div>
        </form>
    );
}
