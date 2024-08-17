import { createStore } from "idb-keyval";

export let idbStore = createStore('personal-time-tracker', 'data');

export const resetIdbStore = () => idbStore = createStore('personal-time-tracker', 'data');

const keys = {
    PROJECTS: 'projects.all',
    RECENT_PROJECT_KEYS: 'projects.recent-keys',
    WEEK_SETTINGS: 'week-settings.all',
    DEFAULT_WEEK_SETTING_ID: 'week-settings.default-id',
    WEEK: 'week.%week',
    DAY: 'day.%day'

}

export const IDB_KEYS: Readonly<typeof keys> = keys;
