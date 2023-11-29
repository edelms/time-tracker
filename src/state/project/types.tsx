export type Project = {
    id: string;
    key: string;
    name: string;
}

export type ProjectGroup = {
    key: string;
    projects: Project[];
}


export type ProjectStoreAccessor = {
    all(): Project[];
    recent(): Project[];
    find(search: string): Project[];
    byKey(projectKey: string): Project | undefined;
    grouped(): ProjectGroup[];

    add(key: string, text: string): Project;
    isKeyInUse(key: string, excludeId?: string): boolean;

    setKey(project: Project, key: string): void;
    setName(project: Project, name: string): void;
    remove(project: Project): void;
}