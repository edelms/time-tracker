import { entries } from "idb-keyval"

import { idbStore } from "@data/idb-stores"

export const exportData = async () => {
    const data = await entries(idbStore);
    return data;
}

