import { Show } from "solid-js";
import { TbBookmark, TbTrash, TbX } from "solid-icons/tb";

import { WeekSetting } from "@data/week-setting/types";
import { useWeekSettingStore } from "@data/week-setting/context";
import { TextInput } from "@controls/TextInput";
import { Button } from "@controls/Button";
import { t } from "@/i18n";

import { DialogHeader } from "../DialogHeader";
import { DayForm } from "./DayForm";
import { WeekSettingStats } from "./WeekSettingStats";

type Props = {
    setting: WeekSetting;
    onDismiss(): void;
}

export const WeekSettingForm = (props: Props) => {

    const weekSettingStore = useWeekSettingStore();

    const handleRemove = () => {
        if (!confirm(t('weeksetting.edit.removeConfirm', { name: props.setting.name }))) return;
        weekSettingStore().remove(props.setting.id);
        props.onDismiss();
    }

    const isDefault = () => weekSettingStore().defaultId() === props.setting.id;

    return (
        <div data-testid='week-setting-form' class="text-sm">

            <DialogHeader text={t('weeksetting.edit.dialogHeader')}
                right={
                    <Button testId="close-button" type="button" label={t('form.button.back')} icon={<TbX />} onClick={() => props.onDismiss()} />
                }
            />

            <div class="px-3 py-3">
                <TextInput testId="name-input" label={t('form.weeksetting.name.label')}
                    value={props.setting.name} onChange={x => weekSettingStore().setName(props.setting.id, x)}
                />
            </div>

            <div class="mx-3 my-2 border border-neutral-700">
                <h4 class="bg-neutral-800 px-3 py-2">{t('weeksetting.columns.workdaysGrid')}</h4>

                <div class="divide-y divide-neutral-700">
                    <div class="flex flex-nowrap gap-2">
                        <div class="flex-1 px-3 py-2 font-semibold flex items-center">
                            {t('weeksetting.columns.weekDay')}
                        </div>
                        <div class="w-28 px-3 py-2 font-semibold flex items-center justify-center">
                            {t('weeksetting.columns.isVisible')}
                        </div>
                        <div class="w-28 px-3 py-2 font-semibold flex items-center justify-center">
                            {t('weeksetting.columns.isWOrkDay')}
                        </div>
                        <div class="w-40 px-3 py-2 font-semibold flex items-center">
                            {t('weeksetting.columns.timeQuota')}
                        </div>
                    </div>

                    <DayForm setting={props.setting} day={1} />
                    <DayForm setting={props.setting} day={2} />
                    <DayForm setting={props.setting} day={3} />
                    <DayForm setting={props.setting} day={4} />
                    <DayForm setting={props.setting} day={5} />
                    <DayForm setting={props.setting} day={6} />
                    <DayForm setting={props.setting} day={0} />
                </div>
            </div>

            <WeekSettingStats setting={props.setting} />


            <div class="flex justify-between items-center px-3 py-2 border-t border-neutral-700">
                <Button testId="remove-button" type="button" label={t('form.button.remove')} icon={<TbTrash />} variant="danger" onClick={handleRemove} />

                <Show when={isDefault()}
                    children={
                        <span data-testid='is-default-message' class="text-emerald-500">{t('weeksetting.message.thisIsDefault')}</span>
                    }
                    fallback={
                        <Button testId="set-default-button" variant="success" label={t('form.button.setAsDefault')} icon={<TbBookmark />}
                            onClick={() => weekSettingStore().setDefault(props.setting.id)}
                        />
                    }
                />

            </div>


        </div>
    );
}



