import { createEffect, createSignal, on } from "solid-js";
import { createStore } from "solid-js/store";
import { get, set } from "idb-keyval";
import { eachDayOfInterval, endOfWeek, startOfToday, startOfWeek } from "date-fns";

import { useWeekSettingStore } from "@data/week-setting/context";
import { createDayStore } from "@data/day/store";
import { dayIdentifier } from "@/helpers/time";
import { FIRST_DAY_OF_WEEK } from "@/constants";

import { IDB_KEYS, idbStore } from "../idb-stores";
import { WeekStoreAccessor } from "./types";


type WeekStore = {
    weekSettingId: string;
}



export const createWeekStore = async (weekDate: Date) => {

    const weekSettingStore = useWeekSettingStore();

    const [store, setStoreOrigin] = createStore<WeekStore>({
        weekSettingId: weekSettingStore().defaultId() || '',
    });

    const [triggerUpdate, setTriggerUpdate] = createSignal(0);

    const setStore: typeof setStoreOrigin = (...args: any) => {
        setStoreOrigin.apply(null, args as never);
        setTriggerUpdate(x => x + 1);
    }


    // intialize day stores
    const dayPromises = eachDayOfInterval({
        start: startOfWeek(weekDate, { weekStartsOn: FIRST_DAY_OF_WEEK }),
        end: endOfWeek(weekDate, { weekStartsOn: FIRST_DAY_OF_WEEK })
    })
        .map(day => createDayStore(day));



    const dbKey = IDB_KEYS.WEEK
        .replace('%week', dayIdentifier(weekDate));

    // Save changes
    createEffect(on(
        triggerUpdate,
        (_) => {
            set(dbKey, JSON.parse(JSON.stringify(store)), idbStore);
        },
        { defer: true }
    ));

    // Load saved data
    const storedData = await get<WeekStore>(dbKey, idbStore);
    if (typeof storedData?.weekSettingId !== 'undefined')
        setStoreOrigin('weekSettingId', storedData.weekSettingId);


    // Wait for days
    const days = await Promise.all(dayPromises);

    const accessor: WeekStoreAccessor = {

        weekSettingId: () => store.weekSettingId,
        weekSetting: () => store.weekSettingId ? weekSettingStore().byId(store.weekSettingId) : undefined,
        setWeekSettingId: (id) => setStore('weekSettingId', id),

        day: (dayDate) => days.find(x => x.id() === dayIdentifier(dayDate)),

        today: () => {
            const todayId = dayIdentifier(startOfToday());
            return days.find(x => x.id() === todayId);
        },

        calcTotalHours: () => days.reduce((sum, x) => sum + x.calcTotalHours(), 0),

        calcQuotaHours: () => {
            if (!store.weekSettingId) return 0;
            const weekSetting = weekSettingStore().byId(store.weekSettingId);
            if (!weekSetting) return 0;

            return days.reduce((sum, day) => sum + day.calcQuotaHours(weekSetting), 0);
        },
    };
    return accessor;
}
