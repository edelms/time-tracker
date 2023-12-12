import { batch, createEffect, createSignal } from "solid-js";
import { IoTrash } from "solid-icons/io";

import { Button } from "@controls/Button";
import { TextInput } from "@controls/TextInput";
import { InputGroup } from "@controls/InputGroup";
import { Project } from "@data/project/types";
import { useProjectStore } from "@data/project/context";
import { t } from "@/i18n";

type Props = {
    project: Project
}

export const ProjectItem = (props: Props) => {

    const projectStore = useProjectStore();

    let keyInput: HTMLInputElement | undefined;
    const [keyError, setKeyError] = createSignal('');
    const [showValidation, setShowValidation] = createSignal(false);

    createEffect(() => {
        keyInput?.setCustomValidity(keyError());
        setShowValidation(!!keyError());
    });

    const handleSetKey = (newKey: string) => {
        if (!newKey) {
            setKeyError(t('form.project.key.requiredError')!);
            return;
        }
        else if (projectStore().isKeyInUse(newKey, props.project.id)) {
            setKeyError(t('form.project.key.inUseError')!);
            return;
        } else {
            setKeyError('');
        }

        batch(() => {
            projectStore().setKey(props.project, newKey);
        })
    };

    const handleSetName = (newName: string) => {
        projectStore().setName(props.project, newName);
    }

    const handleRemove = () => {
        if (!confirm(t('project.edit.removeConfirm'))) return;
        projectStore().remove(props.project);
    }

    return (
        <form data-testid="project-item">
            <InputGroup>
                <div class="w-1/3">
                    <TextInput value={props.project.key} onChange={handleSetKey} placeholder={t('form.project.key.label')}
                        showValidation={showValidation()} validationError={keyError()}
                    />
                </div>
                <TextInput value={props.project.name} onChange={handleSetName} placeholder={t('form.project.name.label')}
                    showValidation={showValidation()}
                />
                <Button type='button' label={t('form.button.remove')} icon={<IoTrash />} variant="danger" onClick={handleRemove} />
            </InputGroup>
        </form>
    )
}
