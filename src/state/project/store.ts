import { createEffect, createSignal, on } from "solid-js";
import { createStore } from "solid-js/store";
import { firstBy } from "thenby";
import { get, set } from "idb-keyval";

import { Project, ProjectGroup, ProjectStoreAccessor } from "./types";
import { IDB_KEYS, idbStore } from "@data/idb-stores";
import { useRecentProjectStore } from "@data/recent-project/context";

const SRCH_RANK_PROJECT_MATCH_KEY = 2;
const SRCH_RANK_PROJECT_MATCH_TEXT = 1;
const SRCH_RANK_PROJECT_IS_RECENT = 1;


type ProjectsStore = {
    projects: Project[];
}

export const createProjectStore = async () => {
    const recentProjects = useRecentProjectStore();

    const [store, setStoreOrigin] = createStore<ProjectsStore>({
        projects: [],
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
            set(IDB_KEYS.PROJECTS, JSON.parse(JSON.stringify(store.projects)), idbStore);
        },
        { defer: true }
    ));


    // Load saved data
    const storedProjects = await get<Project[]>(IDB_KEYS.PROJECTS, idbStore);
    if (storedProjects)
        setStoreOrigin('projects', storedProjects);


    const accessor: ProjectStoreAccessor = {

        all: () => store.projects,

        recent: () => {
            return recentProjects()
                .keys()
                .map(key => store.projects.find(x => x.key === key))
                .filter(x => !!x) as Project[];
        },

        find: (search: string) => {
            if (!search) return [];

            const expression = new RegExp(search, 'i');
            const recentKeys = recentProjects().keys();

            type ProjectWithRank = {
                project: Project,
                rank: number
            }

            const results: ProjectWithRank[] = [];

            store.projects.forEach(project => {
                let ranked: ProjectWithRank | undefined;
                if (project.key.search(expression) !== -1) {
                    ranked = { project, rank: SRCH_RANK_PROJECT_MATCH_KEY };
                } else if (project.name.search(expression) !== -1) {
                    ranked = { project, rank: SRCH_RANK_PROJECT_MATCH_TEXT };
                }

                if (ranked && recentKeys.indexOf(ranked.project.key) !== -1)
                    ranked.rank += SRCH_RANK_PROJECT_IS_RECENT;

                if (ranked)
                    results.push(ranked);
            });

            results.sort(firstBy(x => x.rank, -1));

            return results.map(x => x.project);
        },

        byKey: (key: string) => {
            const project = store.projects.find(x => x.key === key);
            return project;
        },

        grouped: () => {
            const groups: ProjectGroup[] = [];
            store.projects.forEach(p => {
                const groupKey = p.key.split('-')[0];
                let group = groups.find(x => x.key === groupKey);
                if (!group) {
                    group = { key: groupKey, projects: [] };
                    groups.push(group);
                }
                group.projects.push(p);
            });
            return groups;
        },

        add: (key: string, text: string) => {
            const newProject: Project = {
                id: crypto.randomUUID(),
                key: key,
                name: text,
            }

            setStore('projects', (projects) => [...projects, newProject]);
            return newProject;
        },

        isKeyInUse: (key: string, excludeProjectId?: string) => {
            return store.projects.some(x => x.key === key && (!excludeProjectId || x.id !== excludeProjectId));
        },

        setKey: (project: Project, newKey: string) => {
            const hasWithSameKey = store.projects.find(x => x.id !== project.id && x.key === newKey);
            if (hasWithSameKey)
                throw new Error('This key is not allowed, there is already a project with this key!');

            setStore('projects', x => x.id === project.id, 'key', newKey);
        },

        setName: (project: Project, newName: string) => {
            setStore('projects', x => x.id === project.id, 'name', newName);
        },

        remove: (project: Project) => {
            setStore('projects', (projects) => projects.filter(x => x.id !== project.id));
        },
    };
    return accessor;
}
