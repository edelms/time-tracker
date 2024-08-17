import { Accessor, JSX, Show, Signal, createContext, createResource, createSignal, useContext } from "solid-js";
import { endOfWeek, isWithinInterval, startOfISOWeek, startOfWeek } from "date-fns";

import { Initializer } from "@/components/Initializer";
import { FIRST_DAY_OF_WEEK } from "@/constants";

import { WeekStoreAccessor } from "./types";
import { createWeekStore } from "./store";
import { useCurrentWeekStore } from "./context-current";

type ViewingWeekContext = {
    store: Accessor<WeekStoreAccessor>;
    week: Accessor<Date>;
    setWeek(date: Date): void;
}

const viewingWeekContext = createContext<ViewingWeekContext>();

type ProviderProps = {
    children: JSX.Element | JSX.Element[];
}

export const ViewingWeekProvider = (props: ProviderProps) => {

    const currentWeek = useCurrentWeekStore();

    const [week, setWeek] = createSignal<Date>(startOfISOWeek(new Date()));
    const [store] = createResource(
        () => ({ viewingDate: week(), currentWeek: currentWeek() }),
        (data) => {

            const isCurrentWeek = isWithinInterval(
                new Date(),
                {
                    start: startOfWeek(data.viewingDate, { weekStartsOn: FIRST_DAY_OF_WEEK }),
                    end: endOfWeek(data.viewingDate, { weekStartsOn: FIRST_DAY_OF_WEEK }),
                }
            );

            if (isCurrentWeek) {
                return data.currentWeek;
            }
            return createWeekStore(data.viewingDate);
        }
    );

    return (
        <Show when={store()} fallback={<Initializer message="Initializing viewing week..." />}>
            <viewingWeekContext.Provider value={{ store: store as Accessor<WeekStoreAccessor>, week, setWeek }}>
                {props.children}
            </viewingWeekContext.Provider>
        </Show>
    );
}

export const useViewingWeek = () => {
    const store = useContext(viewingWeekContext);
    if (!store) throw new Error('Viewing Week context is not ready');
    return [store.week, store.setWeek] as Signal<Date>;
}

export const useViewingWeekStore = () => {
    const store = useContext(viewingWeekContext);
    if (!store) throw new Error('Viewing Week context is not ready');
    return store.store;
}
