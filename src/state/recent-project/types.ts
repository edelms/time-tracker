export type RecentProjectStoreAccessor = {
    keys(): string[];
    add(key: string): void;
}