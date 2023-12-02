import { For, createEffect, createMemo, onMount } from "solid-js";
import { eachDayOfInterval, startOfWeek, endOfWeek } from 'date-fns'
import Swiper from 'swiper';
import 'swiper/css';

import { useViewingWeek, useViewingWeekStore } from "@data/week/context-viewing";

import { DayColumn } from "./DayColumn";
import { FIRST_DAY_OF_WEEK } from "../../constants";

export const DayGrid = () => {

    const weekStore = useViewingWeekStore();

    let swiper: Swiper | undefined;

    const [weekDate] = useViewingWeek();
    const days = createMemo(() => {
        const start = startOfWeek(weekDate(), { weekStartsOn: FIRST_DAY_OF_WEEK });
        const end = endOfWeek(weekDate(), { weekStartsOn: FIRST_DAY_OF_WEEK });
        return eachDayOfInterval({ start, end })
            .filter(d => weekStore().weekSetting()?.days[d.getDay()]?.show ?? true);
    });

    createEffect(() => {
        days();
        swiper?.update();
    });

    onMount(() => {
        swiper = new Swiper('.swiper', {
            spaceBetween: 12,
            slidesPerView: 'auto',

            centeredSlides: true,
            centeredSlidesBounds: true,
            centerInsufficientSlides: true,

            slideClass: 'swiper-slidec',
        });
        swiper?.update();
    });

    return (
        <div class="relative">

            <div class="swiper py-4 px-2 -mx-2 -mt-4">
                <div class="swiper-wrapper">
                    <For each={days()}>
                        {dayDate => (
                            <DayColumn date={dayDate} />
                        )}
                    </For>
                </div>
            </div>

        </div>

    );
}
