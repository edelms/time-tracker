import { get, set } from "idb-keyval";

import { IDB_KEYS, idbStore } from "@data/idb-stores";
import { t } from "@/i18n";

export const verifyData = (data: any) => {

    if (!Array.isArray(data))
        return t('dataManagement.error.inputNotArray')!;

    const validKeys = Object.keys(IDB_KEYS);

    for (let i = 0; i < data.length; i++) {
        const row = data[i];
        if (!Array.isArray(row))
            return t('dataManagement.error.rowsNotArray')!;
        if (row.length !== 2)
            return t('dataManagement.error.rowsInvalidItemCount')!;

        const key = row[0];

        if (typeof key !== 'string')
            return t('dataManagement.error.keyNotString')!;

        let isKeyValid = false;
        for (let j = 0; j < validKeys.length; j++) {
            const validKeyRegex: string =
                `^${((IDB_KEYS as any)[validKeys[j]] as string)}$`
                    .replace(/\./g, '\\.')
                    .replace('%week', '[0-9]{4}-[0-9]{2}-[0-9]{2}')
                    .replace('%day', '[0-9]{4}-[0-9]{2}-[0-9]{2}');

            if (key.match(validKeyRegex)) {
                isKeyValid = true;
                break;
            }
        }

        if (!isKeyValid)
            return (t('dataManagement.error.invalidKey', { key }));
    }

    return undefined;
}

export const importData = async (data: any) => {
    if (!Array.isArray(data))
        throw new Error(t('dataManagement.error.inputNotArray')!);

    let changedKeys = 0;

    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        if (!Array.isArray(item))
            throw new Error(t('dataManagement.error.rowsNotArray')!);
        if (item.length !== 2)
            throw new Error(t('dataManagement.error.rowsInvalidItemCount')!);

        const key = item[0] as string;
        const valueToImport = item[1] as any;
        const storedValue = await get(key, idbStore);

        const newValue = merge(storedValue, valueToImport);
        const isEqual = JSON.stringify(storedValue) === JSON.stringify(valueToImport);
        if (!isEqual) {
            await set(key, newValue, idbStore);
            changedKeys++;
        }
    }

    return changedKeys;
}



/** Merges input objects/arrays/values */
const merge = (...inputs: any[]) => {
    if (inputs.length === 0) return undefined;

    const first = inputs[0];
    if (Array.isArray(first))
        return mergeArray([], ...inputs);
    else if (typeof first === 'object')
        return mergeObject({}, ...inputs);
    else
        return inputs[inputs.length - 1];
}

/** Merges multiple objects\
 * Objects and Arrays will be deep merged
 */
const mergeObject = (dest: any, ...inputs: any[]) => {
    if (!dest) dest = {};
    inputs.forEach(input => {
        const keys = Object.keys(input);
        keys.forEach(key => {
            const value = input[key];
            if (Array.isArray(value)) {
                dest[key] = mergeArray(dest[key] || [], value);
            }
            else if (typeof value === 'object') {
                dest[key] = mergeObject(dest[key] || {}, value);
            }
            else {
                dest[key] = value;
            }
        });
    });
    return dest;
}

/** Merges multiple arrays\
 * Arrays of objects will deep merge items by 'id' property\
 * Simple arrays tries to avoid duplicates
 */
const mergeArray = (dest: any[], ...inputs: any[][]) => {
    if (!dest) dest = [];

    inputs.forEach(input => {
        input.forEach(item => {

            if (typeof item === 'object') {
                const id = item['id']
                if (typeof id !== 'undefined') {
                    const destIdx = dest.findIndex(x => x['id'] === id);
                    if (destIdx >= 0) {
                        const destItem = dest[destIdx];
                        dest[destIdx] = mergeObject(destItem || {}, item);
                        return;
                    }
                }
            }

            if (dest.indexOf(item) < 0) {
                if (typeof item === 'object') {
                    const merged = mergeObject({}, item);
                    dest.push(merged);
                } else {
                    dest.push(item);
                }
            }
        });
    });

    return dest;
}
