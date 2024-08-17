import { TbCheckbox, TbSquare } from "solid-icons/tb";

import { localeStrings } from "@/helpers/locale-strings";
import { TimeBox } from "@controls/TimeBox";
import { useWeekSettingStore } from "@data/week-setting/context";
import { WeekSetting } from "@data/week-setting/types";

type DayProps = {
    setting: WeekSetting,
    day: Day,
}

export const DayForm = (props: DayProps) => {

    const weekSettingStore = useWeekSettingStore();

    const day = () => props.setting.days[props.day];

    const isWorkDay = () => day().timeQuota > 0;

    return (
        <div data-testid='day-form' class="flex flex-nowrap gap-2">
            <div class="flex-1 px-3 py-1 flex items-center">
                {localeStrings().longWeekday[props.day]}
            </div>
            <div class="w-28 px-3 py-1 flex items-center justify-center">
                <input data-testid='visible-checkbox' type='checkbox'
                    checked={props.setting.days[props.day].show}
                    onchange={e => weekSettingStore().setDayVisibile(props.setting.id, props.day, e.currentTarget.checked)}
                />
            </div>
            <div class="w-28 px-3 py-1 flex items-center justify-center">
                {isWorkDay()
                    ? (<TbCheckbox />)
                    : (<TbSquare />)
                }
            </div>
            <div class="w-40 px-3 py-1">
                <TimeBox value={day().timeQuota}
                    onChange={x => weekSettingStore().setDayTimeQuota(props.setting.id, props.day, x)}
                />
            </div>
        </div>
    );
}