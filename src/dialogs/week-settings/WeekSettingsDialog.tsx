import { Show, createSignal } from "solid-js";

import { WeekSetting } from "@data/week-setting/types";

import { WeekSettingList } from "./WeekSettingList";
import { WeekSettingForm } from "./WeekSettingForm";
import { Dialog } from "../Dialog";

type Props = {
    show: boolean;
    onSelect(setting: WeekSetting): void;
    onClose(show: boolean): void;
}

export const WeekSettingsDialog = (props: Props) => {

    const [editingSetting, setEditingSetting] = createSignal<WeekSetting | undefined>(undefined);
    
    const handleClose = () => {
        props.onClose(false);
        setEditingSetting(undefined);
    }

    const handleSelect = (setting: WeekSetting) => {
        props.onSelect(setting);
        handleClose();
    }

    

    return (
        <Dialog show={props.show} onClose={handleClose}>
            <div data-testid="week-settings-dialog" class="min-w-[34rem]">
                <Show when={!editingSetting()}>
                    <WeekSettingList onEdit={x => setEditingSetting(x)} onSelect={handleSelect} />
                </Show>

                <Show when={editingSetting()}>
                    <WeekSettingForm setting={editingSetting()!} onDismiss={() => setEditingSetting(undefined)} />
                </Show>
            </div>

        </Dialog>
    );
}
