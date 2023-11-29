import { Accessor, JSX, Show, createContext, createEffect, createResource, createSignal, useContext } from "solid-js";
import { addWeeks, startOfISOWeek, startOfWeek } from "date-fns";

import { Initializer } from "@/components/Initializer";

import { WeekStoreAccessor } from "./types";
import { createWeekStore } from "./store";
import { FIRST_DAY_OF_WEEK } from "@/constants";

type CurrentWeekContext = {
    store: Accessor<WeekStoreAccessor>;
}

const currentWeekContext = createContext<CurrentWeekContext>();

type ProviderProps = {
    children: JSX.Element | JSX.Element[];
}

export const CurrentWeekProvider = (props: ProviderProps) => {

    const [week, setWeek] = createSignal<Date>(startOfISOWeek(new Date()));
    const [store] = createResource(() => week(), (w) => createWeekStore(w));

    // Start timer to change the current week on Mon 00:00 of next week
    createEffect(() => {
        const start = startOfWeek(week(), { weekStartsOn: FIRST_DAY_OF_WEEK });
        const next = addWeeks(start, 1);
        const timeToNextWeek = next.getTime() - new Date().getTime();

        setTimeout(() => {
            setWeek(next);
        }, timeToNextWeek);
    });

    return (
        <Show when={store()} fallback={<Initializer message="Initializing current week..." />}>
            <currentWeekContext.Provider value={{ store: store as Accessor<WeekStoreAccessor> }}>
                {props.children}
            </currentWeekContext.Provider>
        </Show>
    );
}

export const useCurrentWeekStore = () => {
    const store = useContext(currentWeekContext);
    if (!store) throw new Error('Current Week context is not ready');
    return store.store;
}
