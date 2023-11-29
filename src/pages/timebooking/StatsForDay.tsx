import { Show, createMemo } from "solid-js";
import clsx from "clsx";

import { DayStoreAccessor } from "@data/day/types";
import { useViewingWeekStore } from "@data/week/context-viewing";
import { useWeekSettingStore } from "@data/week-setting/context";
import { t } from "@/i18n";

type Props = {
    day: Date;
    dayStore: DayStoreAccessor;
}

export const StatsForDay = (props: Props) => {

    const weekStore = useViewingWeekStore();
    const weekSettingStore = useWeekSettingStore();

    const hoursQuota = createMemo(
        () => props.dayStore.isFree() || !weekStore().weekSetting()
            ? 0
            : weekSettingStore().calcDayHours(weekStore().weekSetting()!, props.day.getDay() as Day)
    );

    const hoursActual = createMemo(
        () => props.dayStore.calcTotalHours()
    );

    const percent = createMemo(
        () => props.dayStore.isFree() || hoursQuota() === 0
            ? -1
            : 100 / hoursQuota() * hoursActual()
    );

    return (
        <span class={clsx(
            "text-sm px-4 py-2 flex items-center justify-center gap-4",
            percent() < 0 && 'bg-sky-900',
            percent() >= 0 && percent() < 30 && 'bg-red-900',
            percent() >= 30 && percent() < 80 && 'bg-yellow-900',
            percent() >= 80 && percent() < 100 && 'bg-emerald-900',
            percent() >= 100 && 'bg-lime-900'
        )}>

            <Show when={percent() >= 0}>
                <span>
                    {percent().toFixed(0)} %
                </span>
            </Show>

            <span>
                {t('calc.actual')}: {+hoursActual().toFixed(2)} {t('time.hours.short')}
            </span>

            <span>
                {t('calc.quota')}: {+hoursQuota().toFixed(2)} {t('time.hours.short')}
            </span>

        </span>
    );
}
