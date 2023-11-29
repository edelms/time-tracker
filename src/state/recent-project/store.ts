import { createEffect, createSignal, on } from "solid-js";
import { createStore } from "solid-js/store";
import { get, set } from "idb-keyval";

import { IDB_KEYS, idbStore } from "../idb-stores";
import { RecentProjectStoreAccessor } from "./types";

const RECENT_COUNT = 10;

type RecentProjectStore = {
    projectKeys: string[];
}



export const createRecentProjectStore = async () => {

    const [store, setStoreOrigin] = createStore<RecentProjectStore>({
        projectKeys: [],
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
            set(IDB_KEYS.RECENT_PROJECT_KEYS, JSON.parse(JSON.stringify(store.projectKeys)), idbStore);
        },
        { defer: true }
    ));


    // Load saved data
    const storedKeys = await get<string[]>(IDB_KEYS.RECENT_PROJECT_KEYS, idbStore);
    if (storedKeys)
        setStoreOrigin('projectKeys', storedKeys);


    const accessor: RecentProjectStoreAccessor = {
        keys: () => store.projectKeys,

        add: (projectKey: string) => {
            if (store.projectKeys.length > 0 && store.projectKeys[0] === projectKey)
                return;

            setStore('projectKeys', (x) => [
                projectKey,
                ...x.filter(x => x !== projectKey).slice(0, RECENT_COUNT - 1)
            ]);
        },
    };
    return accessor;
}
