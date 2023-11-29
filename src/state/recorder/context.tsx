import { Accessor, JSX, Show, createContext, createResource, useContext } from "solid-js";

import { Initializer } from "@/components/Initializer";

import { RecorderStoreAccessor } from "./types";
import { createRecorderStore } from "./store";

const recorderContext = createContext<Accessor<RecorderStoreAccessor>>();

type ProviderProps = {
    children: JSX.Element | JSX.Element[];
}

export const RecorderProvider = (props: ProviderProps) => {
    const [store] = createResource(createRecorderStore);

    return (
        <Show when={store()} fallback={<Initializer message="Initializing recorder..." />}>
            <recorderContext.Provider value={store as Accessor<RecorderStoreAccessor>}>
                {props.children}
            </recorderContext.Provider>
        </Show>
    );
}

export const useRecorderStore = () => {
    const store = useContext(recorderContext);
    if (!store) throw new Error('Recorder context is not ready');
    return store;
}
