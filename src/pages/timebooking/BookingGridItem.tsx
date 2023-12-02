import { FiMoreHorizontal } from "solid-icons/fi";
import { createSignal } from "solid-js";

import { useRecorderStore } from "@data/recorder/context";
import { Timebooking, DayStoreAccessor } from "@data/day/types";
import { TimeBox } from "@controls/TimeBox";
import { ProjectPicker } from "@controls/ProjectPicker";
import { TextArea } from "@controls/TextArea";
import { Shimmer } from "@/components/Shimmer";
import { t } from "@/i18n";

import { BookingMenuDialog } from "../../dialogs/booking-menu/BookingMenuDialog";
import clsx from "clsx";

type Props = {
    booking: Timebooking;
    dayStore: DayStoreAccessor;
    isNew: boolean;
}

export const BookingGridItem = (props: Props) => {

    const recorderStore = useRecorderStore();

    const [showMenuDialog, setShowMenuDialog] = createSignal(false);

    const isRecording = () => recorderStore().bookingId() === props.booking.id;

    return (
        <div class="text-white relative isolate border-b border-neutral-900/50">
            <Shimmer enable={isRecording()} class="bg-neutral-700" />

            <div class={clsx(
                "bg-neutral-700 overflow-hidden",
                isRecording() && 'outline outline-red-600/40 outline-1',
            )}>

                <div class="flex items-stretch border-t-4 border-b border-neutral-900/50 bg-neutral-900/10 pr-1">

                    <TimeBox value={props.booking.start}
                        onChange={x => props.dayStore.setBookingStart(props.booking, x)}
                        autofocus={props.isNew}
                    />
                    <span class="flex items-center bg-neutral-900/50">-</span>
                    <TimeBox value={props.booking.end}
                        onChange={x => props.dayStore.setBookingEnd(props.booking, x)}
                    />

                    <ProjectPicker projectKey={props.booking.projectKey}
                        onChange={x => props.dayStore.setBookingProjectKey(props.booking, x)}
                        class="flex-1 py-2 pl-2 pr-1"
                    />

                    <span class="flex items-center justify-end">
                        <button type='button' onclick={() => setShowMenuDialog(true)}
                            title={t('form.alt.more')}
                            class="text-slate-300 hover:bg-white/20 p-1 rounded-md"
                        >
                            <FiMoreHorizontal size={12} />
                        </button>
                    </span>

                </div>

                <div class="text-xs pb-1">
                    <TextArea value={props.booking.text} placeholder={t('booking.emptyText')}
                        onChange={x => props.dayStore.setBookingText(props.booking, x)}
                    />
                </div>
            </div>

            <BookingMenuDialog booking={props.booking} dayStore={props.dayStore}
                show={showMenuDialog()} onClose={() => setShowMenuDialog(false)}
            />

        </div>
    )
}
