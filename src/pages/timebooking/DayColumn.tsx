import { For, Show, batch, createSignal } from "solid-js";
import { FiPlus } from "solid-icons/fi";
import { TbBeach, TbBuilding, TbHome } from "solid-icons/tb";
import { isToday, format } from "date-fns";

import { useViewingWeekStore } from "@data/week/context-viewing";
import { Button } from "@controls/Button";
import { t } from "@/i18n";

import { BookingGridItem } from "./BookingGridItem";
import { StatsForDay } from "./StatsForDay";
import { localeStrings } from "../../helpers/locale-strings";


type Props = {
    date: Date;
}

export const DayColumn = (props: Props) => {

    const weekStore = useViewingWeekStore();
    const dayStore = () => weekStore().day(props.date);

    const [newId, setNewId] = createSignal('');

    const handleAddBooking = () => {
        batch(() => {
            const newBooking = dayStore()?.addBooking({});
            if (newBooking)
                setNewId(newBooking.id);
        });
    };

    const dayMode = () => dayStore()?.dayMode() ?? 'office';
    const isFree = () => dayStore()?.isFree() ?? false;

    const today = () => isToday(props.date);

    return (
        <div class="flex-grow-0 flex-shrink-0 swiper-slidec relative transition-transform bg-neutral-700 text-white rounded-md w-80 flex flex-col items-stretch justify-stretch">
            <h3 class="relative bg-neutral-800 text-center text-lg px-4 py-2 rounded-t-md">
                <span class="font-semibold">{localeStrings().shortWeekday[props.date.getDay()]}</span>
                &nbsp;
                <i class="text-sm">{format(props.date, 'dd.MM.')}</i>

                <Button onClick={() => dayStore()?.toggleDayMode()}
                    class="absolute right-1 top-1/2 -translate-y-1/2"
                    title={
                        dayMode() === 'office'
                            ? t('calendar.day.mode.office')
                            : dayMode() === 'homeoffice'
                                ? t('calendar.day.mode.homeoffice')
                                : t('calendar.day.mode.free')
                    }
                    icon={
                        dayMode() === 'office'
                            ? <TbBuilding size={20} class="text-sky-500" />
                            : dayMode() === 'homeoffice'
                                ? <TbHome size={20} class="text-amber-500" />
                                : <TbBeach size={20} class="text-emerald-500" />
                    } />
            </h3>

            <div class="relative flex-1">

                <Show when={dayStore()}
                    children={
                        <StatsForDay day={props.date} dayStore={dayStore()!} />
                    }
                    fallback={
                        <div class="bg-red-900 px-3 py-2 flex items-center justify-center gap-1 text-sm">
                            {t('calendar.info.noWeekSettings.short')}
                        </div>
                    }
                />

                <div class="flex-1 flex flex-col gap-1 text-sm">

                    <For each={dayStore()?.bookings()}>
                        {booking => (
                            <BookingGridItem booking={booking} dayStore={dayStore()!}
                                isNew={newId() === booking.id}
                            />
                        )}
                    </For>
                </div>

                <div class="text-center px-4 py-2">
                    <button type='button' onclick={handleAddBooking}
                        class="px-2 py-2 hover:bg-neutral-900 rounded-full"
                    >
                        <FiPlus />
                    </button>
                </div>

                <Show when={isFree()}>
                    <div class="absolute z-10 inset-0 pointer-events-none striped-free"></div>
                </Show>
            </div>

            <Show when={today()}>
                <div class="absolute -inset-1 border-2 rounded-lg border-emerald-800 pointer-events-none">
                </div>
            </Show>

        </div>
    );
}
