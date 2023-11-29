import { For, Show } from "solid-js";
import { TbEdit, TbPlus, TbPointer } from "solid-icons/tb";

import { WeekSetting } from "@data/week-setting/types";
import { useWeekSettingStore } from "@data/week-setting/context";
import { t } from "@/i18n";

import { Button } from "../../controls/Button";
import { DialogHeader } from "../DialogHeader";

type Props = {
    onSelect(weekSetting: WeekSetting): void;
    onEdit(weekSetting: WeekSetting): void;
}

export const WeekSettingList = (props: Props) => {

    const weekSettingStore = useWeekSettingStore();

    return (
        <div class="text-sm">

            <DialogHeader text={t('weeksetting.list.dialogHeader')} />


            <Show when={weekSettingStore().all().length === 0}>
                <p class="text-center py-4 text-red-500">
                    {t('weeksetting.message.noWeekSettings')}
                </p>
            </Show>

            <ul class="divide-y divide-neutral-700">
                <For each={weekSettingStore().all()}>
                    {(weekSetting) => (
                        <li class="px-3 py-2 flex items-center gap-3">

                            <Button type='button' label={t('form.button.select')} icon={<TbPointer />}
                                onClick={() => props.onSelect(weekSetting)}
                            />

                            <span class="flex-1 flex gap-3">
                                <span>{weekSetting.name}</span>
                                <Show when={weekSettingStore().defaultId() === weekSetting.id}>
                                    <span class="text-neutral-500">{t('weeksetting.list.defaultItem')}</span>
                                </Show>
                            </span>

                            <Button type='button' label={t('form.button.edit')} icon={<TbEdit />} variant="danger"
                                onClick={() => props.onEdit(weekSetting)}
                            />
                        </li>
                    )}
                </For>
            </ul>

            <div class="flex justify-end px-3 py-2 border-t border-neutral-700">
                <Button type="button" label={t('form.button.add')} icon={<TbPlus />} variant="success" onClick={() => weekSettingStore().add({})} />
            </div>

        </div>
    );
}
