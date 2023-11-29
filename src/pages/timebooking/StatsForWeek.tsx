import { Show, createMemo } from "solid-js";
import clsx from "clsx";
import { TbSettings } from "solid-icons/tb";

import { useWeekSettingStore } from "@data/week-setting/context";
import { useViewingWeekStore } from "@data/week/context-viewing";
import { t } from "@/i18n";


export const StatsForWeek = () => {

    const weekStore = useViewingWeekStore();
    const weekSettingStore = useWeekSettingStore();

    const hoursActual = createMemo(() => weekStore().calcTotalHours());
    const hoursQuota = createMemo(() => weekStore().weekSetting() ? weekSettingStore().calcWeekHours(weekStore().weekSetting()!) : 0);

    const percent = createMemo(
        () => weekStore().weekSetting() && hoursQuota() > 0
            ? 100 / hoursQuota() * hoursActual()
            : 0
    );

    return (
        <Show when={weekStore().weekSetting()}
            children={
                <div class="text-sm flex items-center justify-between gap-4">
                    <span class="bg-yellow-900 px-4 py-1 rounded-md">
                        {weekStore().weekSetting()?.name}
                    </span>

                    <span class={clsx(
                        "px-4 py-1 rounded-md flex items-center gap-4",
                        percent() < 30 && 'bg-red-900',
                        percent() >= 30 && percent() < 80 && 'bg-yellow-900',
                        percent() >= 80 && percent() < 100 && 'bg-emerald-900',
                        percent() >= 100 && 'bg-lime-900'
                    )}>

                        <span>
                            {percent().toFixed(0)} %
                        </span>

                        <span>
                            {t('calc.actual')}: {+hoursActual().toFixed(2)} {t('time.hours.short')}
                        </span>

                        <span>
                            {t('calc.quota')}: {+hoursQuota().toFixed(2)} {t('time.hours.short')}
                        </span>
                    </span>
                </div>
            }
            fallback={
                <div class="bg-red-900 rounded-md px-3 py-1 flex items-center justify-center gap-1 text-sm">
                    {t('calendar.info.noWeekSettings.longBeforeIcon')} <TbSettings /> {t('calendar.info.noWeekSettings.longAfterIcon')}
                </div>
            }
        />


    );
}
