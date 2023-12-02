import { batch, createEffect, createSignal, on } from "solid-js";
import { createStore } from "solid-js/store";
import { get, set } from "idb-keyval";
import { firstBy } from "thenby";

import { dayIdentifier } from "@/helpers/time";
import { WeekSetting } from "@data/week-setting/types";
import { useWeekSettingStore } from "@data/week-setting/context";

import { IDB_KEYS, idbStore } from "../idb-stores";
import { DayStoreAccessor, DayMode, Timebooking } from "./types";


type DayStore = {
    id: string;
    dayMode: DayMode;
    bookings: Timebooking[];
}



export const createDayStore = async (dayDate: Date) => {
    const id = dayIdentifier(dayDate);

    const weekSettingStore = useWeekSettingStore();


    const [store, setStoreOrigin] = createStore<DayStore>({
        id: id,
        dayMode: 'office',
        bookings: [],
    });

    const [triggerUpdate, setTriggerUpdate] = createSignal(0);

    const setStore: typeof setStoreOrigin = (...args: any) => {
        setStoreOrigin.apply(null, args as never);
        setTriggerUpdate(x => x + 1);
    }


    const dbKey = IDB_KEYS.DAY
        .replace('%day', id);

    // Save changes
    createEffect(on(
        triggerUpdate,
        (_) => {
            set(dbKey, JSON.parse(JSON.stringify(store)), idbStore);
        },
        { defer: true }
    ));

    // Load saved data
    const storedData = await get<DayStore>(dbKey, idbStore);
    if (storedData?.dayMode)
        setStoreOrigin('dayMode', storedData.dayMode);
    if (storedData?.bookings)
        setStoreOrigin('bookings', storedData.bookings);


    const accessor: DayStoreAccessor = {
        id: () => store.id,
        dayMode: () => store.dayMode || 'office',
        isFree: () => store.dayMode === 'free',

        toggleDayMode: () => {
            let newDayMode = store.dayMode || 'office';
            switch (newDayMode) {
                case 'office':
                    newDayMode = 'homeoffice';
                    break;
                case 'homeoffice':
                    newDayMode = 'free';
                    break;
                case 'free':
                    newDayMode = 'office';
                    break;
            }
            setStore('dayMode', newDayMode);
        },


        bookings: () => store.bookings.concat([]).sort(firstBy(x => x.start)),
        bookingById: (id: string) => store.bookings.find(x => x.id === id),

        bookingsWithGaps: () => {
            const bookings: (Timebooking | undefined)[] = store.bookings.concat([]).sort(firstBy(x => x.start));
            for (let i = bookings.length - 1; i > 0; i--) {
                const hasGap = (bookings[i]?.start ?? 0) > (bookings[i - 1]?.end ?? 0);
                if (hasGap)
                    bookings.splice(i, 0, undefined);
            }
            return bookings;
        },

        addBooking: (data) => {

            const endOfLastBooking =
                store.bookings
                    .reduce((max, b) => b.end > max ? b.end : max, 0);

            const newBooking: Timebooking = {
                id: crypto.randomUUID(),
                start: data.start || endOfLastBooking,
                end: data.end || endOfLastBooking,
                projectKey: data.projectKey || '',
                text: data.text || '',
            };
            setStore('bookings', x => [...x, newBooking]);
            return newBooking;
        },

        removeBooking: (booking) => {
            setStore('bookings', x => x.filter(x => x.id !== booking.id));
        },
        setBookingStart: (booking, start) => {
            batch(() => {
                setStore('bookings', x => x.id === booking.id, 'start', start);
                if (booking.end < start)
                    setStore('bookings', x => x.id === booking.id, 'end', start);
            });
        },
        setBookingEnd: (booking, end) => {
            batch(() => {
                setStore('bookings', x => x.id === booking.id, 'end', end);
                if (booking.start > end)
                    setStore('bookings', x => x.id === booking.id, 'start', end);
            });
        },
        setBookingText: (booking, text) => {
            setStore('bookings', x => x.id === booking.id, 'text', text);
        },
        setBookingProjectKey: (booking, projectKey) => {
            setStore('bookings', x => x.id === booking.id, 'projectKey', projectKey);
        },

        calcTotalHours: () => store.bookings.reduce((sum, x) => sum += (Math.max(x.start, x.end) - Math.min(x.start, x.end)), 0) / 60,

        calcQuotaHours: (weekSetting: WeekSetting | undefined) => {
            if (store.dayMode === 'free') return 0;
            if (!weekSetting) return 0;
            return weekSettingStore().calcDayHours(weekSetting, dayDate.getDay() as Day);
        },

    };
    return accessor;
}
