import { Accessor, JSX, Show, createContext, createResource, useContext } from "solid-js";

import { Initializer } from "@/components/Initializer";

import { RecentProjectStoreAccessor } from "./types";
import { createRecentProjectStore } from "./store";

const recentProjectContext = createContext<Accessor<RecentProjectStoreAccessor>>();

type ProviderProps = {
    children: JSX.Element | JSX.Element[];
}

export const RecentProjectsProvider = (props: ProviderProps) => {

    const [store] = createResource(createRecentProjectStore);

    return (
        <Show when={store()} fallback={<Initializer message="Initializing recent projects..." />}>
            <recentProjectContext.Provider value={store as Accessor<RecentProjectStoreAccessor>}>
                {props.children}
            </recentProjectContext.Provider>
        </Show>
    );
}

export const useRecentProjectStore = () => {
    const store = useContext(recentProjectContext);
    if (!store) throw new Error('Recent Projects context is not ready');
    return store;
}
