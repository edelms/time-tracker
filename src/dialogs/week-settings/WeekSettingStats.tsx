import { t } from "@/i18n";
import { useWeekSettingStore } from "@data/week-setting/context";
import { WeekSetting } from "@data/week-setting/types";

type StatsProps = {
    setting: WeekSetting,
}

export const WeekSettingStats = (props: StatsProps) => {

    const weekSettingStore = useWeekSettingStore();

    return (
        <div class="text-center text-neutral-400 py-3 flex gap-3 items-center justify-center">
            <span>{weekSettingStore().calcNumberWorkDays(props.setting)} {t('weeksetting.stats.workDays')}</span>
            <span class="pl-5">{t('weeksetting.stats.workTime')}:</span>
            <span>{weekSettingStore().calcWeekHours(props.setting)} {t('weeksetting.stats.hrsPerWeek')}</span>
            <span>~{weekSettingStore().calcMonthHours(props.setting)} {t('weeksetting.stats.hrsPerMonth')}</span>
        </div>
    );
}