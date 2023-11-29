import { DayStoreAccessor } from "@data/day/types";
import { WeekSetting } from "@data/week-setting/types";


export type WeekStoreAccessor = {
    day(dayDate: Date): DayStoreAccessor | undefined;
    today(): DayStoreAccessor | undefined;

    weekSetting(): WeekSetting | undefined;
    weekSettingId(): string;
    setWeekSettingId(id: string): void;

    calcTotalHours(): number;
}
