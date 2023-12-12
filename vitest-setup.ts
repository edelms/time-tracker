import '@testing-library/jest-dom/vitest'

// Init i18n
import { createMemo } from "solid-js";
import * as i18n from "@solid-primitives/i18n";
import { Dictionary, assignT } from "@/i18n";
import en from "@/i18n/translations/en.js";
const dict = createMemo(() => i18n.flatten(en));
const testT: i18n.NullableTranslator<Dictionary> = i18n.translator(dict, i18n.resolveTemplate);
assignT(testT);

// Clean indexed db + idb-store before each test
import { IDBFactory } from "fake-indexeddb";
import { resetIdbStore } from '@data/idb-stores';
beforeEach(() => {
    global.indexedDB = new IDBFactory();
    resetIdbStore();
});

// Polyfill html dialog to jsdom
// Src: https://github.com/jsdom/jsdom/issues/3294
beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
});