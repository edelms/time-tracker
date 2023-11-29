import { Accessor, JSX, Show, createContext, createResource, useContext } from "solid-js";

import { Initializer } from "@/components/Initializer";

import { ProjectStoreAccessor } from "./types";
import { createProjectStore } from "./store";

const projectContext = createContext<Accessor<ProjectStoreAccessor>>();

type ProviderProps = {
    children: JSX.Element | JSX.Element[];
}

export const ProjectsProvider = (props: ProviderProps) => {
    const [store] = createResource(createProjectStore);

    return (
        <Show when={store()} fallback={<Initializer message="Initializing projects..." />}>
            <projectContext.Provider value={store as Accessor<ProjectStoreAccessor>}>
                {props.children}
            </projectContext.Provider>
        </Show>
    );
}

export const useProjectStore = () => {
    const store = useContext(projectContext);
    if (!store) throw new Error('Projects context is not ready');
    return store;
}
