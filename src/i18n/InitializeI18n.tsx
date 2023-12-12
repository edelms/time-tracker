import { JSX, createSignal, createResource, createEffect, Show } from "solid-js"
import * as i18n from "@solid-primitives/i18n";
import { NullableTranslator } from "@solid-primitives/i18n";

import { Initializer } from "@/components/Initializer";
import type en from "@/i18n/translations/en.js";

type RawDictionary = typeof en;
export type Dictionary = i18n.Flatten<RawDictionary>;

export let t: NullableTranslator<Dictionary>;


async function fetchDictionary(locale: string): Promise<Dictionary> {
    try {
        const dict: RawDictionary = (await import(`./translations/${locale}.ts`)).default;
        return i18n.flatten(dict);
    } catch {
        const dict: RawDictionary = (await import(`./translations/en.ts`)).default;
        return i18n.flatten(dict);
    }
}


type Props = {
    children: JSX.Element | JSX.Element[];
}

export const InitializeI18n = (props: Props) => {

    const browserLang = navigator.language.substring(0, 2);
    const [locale] = createSignal<string>(browserLang);
    const [ready, setReady] = createSignal(!!t);
    const [dict] = createResource(locale, fetchDictionary);


    createEffect(() => {
        if (dict()) {
            t = i18n.translator(dict, i18n.resolveTemplate);
            setReady(true);
        }
    })


    return (
        <Show when={ready()}
            children={props.children}
            fallback={<Initializer message="Waiting for translations..." />}
        />
    );


}

export const assignT = (newT: i18n.NullableTranslator<Dictionary>) => t = newT;