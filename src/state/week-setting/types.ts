export type WeekSetting = {
    id: string;
    name: string;
    days: [DaySettings, DaySettings, DaySettings, DaySettings, DaySettings, DaySettings, DaySettings];
}

export type DaySettings = {
    show: boolean;
    timeQuota: number;
}

export type WeekSettingStoreAccessor = {
    all(): WeekSetting[];
    byId(id: string): WeekSetting | undefined;
    default(): WeekSetting | undefined;
    defaultId(): string;
    setDefault(id: string): void;

    add(data: Partial<WeekSetting>): WeekSetting;
    remove(id: string): void;

    setName(id: string, name: string): void;
    setDayVisibile(id: string, day: Day, show: boolean): void;
    setDayTimeQuota(id: string, day: Day, timeQuota: number): void;

    calcNumberWorkDays(setting: WeekSetting): number;
    calcDayHours(setting: WeekSetting, day: Day): number;
    calcWeekHours(setting: WeekSetting): number;
    calcMonthHours(setting: WeekSetting): number;
}
