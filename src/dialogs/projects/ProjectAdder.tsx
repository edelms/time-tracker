import { createEffect, createSignal } from "solid-js";
import { IoAdd } from "solid-icons/io";

import { useProjectStore } from "@data/project/context";
import { InputGroup } from "@controls/InputGroup";
import { TextInput } from "@controls/TextInput";
import { Button } from "@controls/Button";
import { t } from "@/i18n";



export const ProjectAdder = () => {
    const projectStore = useProjectStore();

    let keyInput: HTMLInputElement | undefined;

    const [key, setKey] = createSignal('');
    const [name, setName] = createSignal('');
    const [keyError, setKeyError] = createSignal('');
    const [showValidation, setShowValidation] = createSignal(false);

    createEffect(() => {
        keyInput?.setCustomValidity(keyError());
        setShowValidation(!!keyError());
    });

    const handleAddProject = () => {
        if (!key()) {
            setKeyError(t('form.project.key.requiredError')!);
            return;
        } else if (projectStore().isKeyInUse(key())) {
            setKeyError(t('form.project.key.inUseError')!);
            return;
        } else {
            setKeyError('');
        }

        projectStore().add(key(), name());
        setKey('');
        setName('');

        if (keyInput)
            keyInput.focus();
    }

    return (
        <form data-testid="project-adder" onsubmit={handleAddProject}>
            <div class="flex flex-col gap-1 text-sm">
                <label for="new-project-key" class="px-2 font-semibold">{t('project.edit.createLabel')}</label>

                <InputGroup>

                    <div class="w-1/3">
                        <TextInput testId="key-input" value={key()} onChange={setKey} placeholder={t('form.project.key.label')} id="new-project-key"
                            showValidation={showValidation()}
                            validationError={keyError()}
                        />
                    </div>

                    <TextInput testId="name-input" value={name()} onChange={setName} placeholder={t('form.project.name.label')}
                        showValidation={showValidation()}
                    />

                    <Button type='submit' onClick={handleAddProject}
                        label={t('form.button.add')} variant="success" icon={<IoAdd />} />
                </InputGroup>

            </div>
        </form>
    );
}
