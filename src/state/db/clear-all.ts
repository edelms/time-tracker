import { clear } from "idb-keyval"

import { idbStore } from "@data/idb-stores"

export const clearAllData = async () => {
    await clear(idbStore);
}
