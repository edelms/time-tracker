import { createStore } from "solid-js/store";
import { batch } from "solid-js";

import { useCurrentWeekStore } from "@data/week/context-current";
import { ROUND_TO_MINUTES } from "@/constants";
import { roundTime } from "@/helpers/time";

import { RecorderStoreAccessor } from "./types";

type RecorderStore = {
    recordingDayId: string;
    recordingBookingId: string;
}

export const createRecorderStore = async () => {

    const currentWeekStore = useCurrentWeekStore();

    const [store, setStore] = createStore<RecorderStore>({
        recordingDayId: '',
        recordingBookingId: '',
    });

    let recordingTimer: any;

    const stop = (skipUpdater: boolean = false) => {
        if (store.recordingBookingId) {
            if (recordingTimer) {
                clearInterval(recordingTimer);
                if (!skipUpdater)
                    recorderUpdater();
                recordingTimer = undefined;
            }
            batch(() => {
                setStore('recordingDayId', '');
                setStore('recordingBookingId', '');
            });
        }
    }

    // Timer to keep the end-time of the booking up-to-date
    let recorderUpdater = () => {
        if (currentWeekStore() && store.recordingBookingId) {
            const dayStore = currentWeekStore()?.today();
            if (dayStore) {
                const booking = dayStore.bookingById(store.recordingBookingId);
                if (booking) {
                    const now = new Date();
                    const newEnd = roundTime(now.getHours() * 60 + now.getMinutes(), ROUND_TO_MINUTES);
                    if (booking.end !== newEnd)
                        dayStore.setBookingEnd(booking, newEnd);
                } else {
                    // booking is gone, stop recording
                    stop(true);
                }
            } else {
                // current week has changed and today is out of scope, stop recording
                stop(true);
            }
        } else {
            // current week store is gone or recording state is gone, stop recording
            stop(true);
        }
    }

    const accessor: RecorderStoreAccessor = {
        bookingId: () => store.recordingBookingId,
        isRecording: () => !!store.recordingBookingId,
        allowRecord: () => {
            return !!currentWeekStore()?.today()
        },

        start: () => {
            if (!store.recordingBookingId) {
                const now = new Date();
                const startTime = roundTime(now.getHours() * 60 + now.getMinutes(), ROUND_TO_MINUTES);

                const dayStore = currentWeekStore()?.today();
                if (dayStore) {

                    const booking = dayStore.addBooking({
                        start: startTime,
                        end: startTime,
                    });

                    if (recordingTimer) {
                        clearInterval(recordingTimer);
                    }
                    recordingTimer = setInterval(recorderUpdater, 15 * 1000);
                    batch(() => {
                        setStore('recordingDayId', dayStore.id());
                        setStore('recordingBookingId', booking.id);
                    });
                    return booking;
                }
            }
        },

        stop,
    };
    return accessor;
}
