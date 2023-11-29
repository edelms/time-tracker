import { createEffect, createSignal, on } from "solid-js";
import { createStore } from "solid-js/store";
import { get, set } from "idb-keyval";

import { IDB_KEYS, idbStore } from "../idb-stores";
import { WeekSetting, WeekSettingStoreAccessor } from "./types";


type WeekSettingStore = {
    settings: WeekSetting[];
    defaultId: string;
}



export const createWeekSettingStore = async () => {

    const [store, setStoreOrigin] = createStore<WeekSettingStore>({
        settings: [],
        defaultId: '',
    });

    const [triggerUpdate, setTriggerUpdate] = createSignal(0);

    const setStore: typeof setStoreOrigin = (...args: any) => {
        setStoreOrigin.apply(null, args as never);
        setTriggerUpdate(x => x + 1);
    }


    // Save changes
    createEffect(on(
        triggerUpdate,
        (_) => {
            set(IDB_KEYS.WEEK_SETTINGS, JSON.parse(JSON.stringify(store.settings)), idbStore);
            set(IDB_KEYS.DEFAULT_WEEK_SETTING_ID, JSON.parse(JSON.stringify(store.defaultId)), idbStore);
        },
        { defer: true }
    ));


    // Load saved data
    const storedWeekSettings = await get<WeekSetting[]>(IDB_KEYS.WEEK_SETTINGS, idbStore);
    if (storedWeekSettings)
        setStoreOrigin('settings', storedWeekSettings);

    const storedDefaultSettingId = await get<string>(IDB_KEYS.DEFAULT_WEEK_SETTING_ID, idbStore);
    if (storedDefaultSettingId)
        setStoreOrigin('defaultId', storedDefaultSettingId);


    const accessor: WeekSettingStoreAccessor = {

        all: () => store.settings,
        byId: (id) => store.settings.find(x => x.id === id),

        defaultId: () => store.defaultId,
        default: () => store.defaultId ? store.settings.find(x => x.id === store.defaultId) : undefined,
        setDefault: (id) => setStore('defaultId', id),

        add: (data) => {
            const newSetting: WeekSetting = {
                id: crypto.randomUUID(),
                name: data.name || 'New Week setting',
                days: [
                    data.days?.[0] || { show: false, timeQuota: 0 },
                    data.days?.[1] || { show: true, timeQuota: 462 },
                    data.days?.[2] || { show: true, timeQuota: 462 },
                    data.days?.[3] || { show: true, timeQuota: 462 },
                    data.days?.[4] || { show: true, timeQuota: 462 },
                    data.days?.[5] || { show: true, timeQuota: 462 },
                    data.days?.[6] || { show: false, timeQuota: 0 },

                ]
            };

            setStore('settings', x => [...x, newSetting]);
            return newSetting;
        },

        remove: (id) => setStore('settings', x => x.filter(y => y.id !== id)),
        setName: (id, name) => setStore('settings', x => x.id === id, 'name', name),
        setDayVisibile: (id, day, show) => setStore('settings', x => x.id === id, 'days', (_, i) => i === day, 'show', show),
        setDayTimeQuota: (id, day, timeQuota) => setStore('settings', x => x.id === id, 'days', (_, i) => i === day, 'timeQuota', timeQuota),

        calcNumberWorkDays: (setting) => setting.days.filter(x => x.timeQuota > 0).length,
        calcDayHours: (setting, day) => setting.days[day].timeQuota / 60,
        calcWeekHours: (setting) => setting.days.reduce((sum, x) => sum + x.timeQuota, 0) / 60,
        calcMonthHours: (setting) => setting.days.reduce((sum, x) => sum + x.timeQuota, 0) / 60 * 4,
    };
    return accessor;
}
