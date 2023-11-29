import { Accessor, JSX, Show, createContext, createResource, useContext } from "solid-js";

import { Initializer } from "@/components/Initializer";
import { WeekSettingStoreAccessor } from "./types";
import { createWeekSettingStore } from "./store";


const weekSettingContext = createContext<Accessor<WeekSettingStoreAccessor>>();

type ProviderProps = {
    children: JSX.Element | JSX.Element[];
}

export const WeekSettingsProvider = (props: ProviderProps) => {

    const [store] = createResource(createWeekSettingStore);

    return (
        <Show when={store()} fallback={<Initializer message="Initializing week settings..." />}>
            <weekSettingContext.Provider value={store as Accessor<WeekSettingStoreAccessor>}>
                {props.children}
            </weekSettingContext.Provider>
        </Show>
    );
}

export const useWeekSettingStore = () => {
    const store = useContext(weekSettingContext);
    if (!store) throw new Error('Week Settings context is not ready');
    return store;
}
