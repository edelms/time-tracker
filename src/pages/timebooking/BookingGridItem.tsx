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
        <div class="text-white relative isolate border-b border-t border-neutral-900/50">
            <Shimmer enable={isRecording()} class="bg-neutral-700" />

            <div class={clsx(
                "bg-neutral-700 overflow-hidden",
                isRecording() && 'outline outline-red-600/40 outline-1',
            )}>

                <div class="flex items-stretch  border-neutral-900/50 bg-neutral-900/10">

                    <div class="bg-neutral-900/50 flex flex-col items-center justify-stretch">
                        <TimeBox value={props.booking.start} placeholder={t('booking.label.startTime')}
                            onChange={x => props.dayStore.setBookingStart(props.booking, x)}
                            autofocus={props.isNew}
                            class="flex-1"
                        />
                        <span class="flex items-center">-</span>
                        <TimeBox value={props.booking.end} placeholder={t('booking.label.endTime')}
                            onChange={x => props.dayStore.setBookingEnd(props.booking, x)}
                            class="flex-1"
                        />
                    </div>

                    <div class="flex-1">

                        <div class="flex">
                            <ProjectPicker projectKey={props.booking.projectKey}
                                onChange={x => props.dayStore.setBookingProjectKey(props.booking, x)}
                                class="flex-1 pl-3"
                            />

                            <span class="flex items-center justify-end">
                                <button type='button' onclick={() => setShowMenuDialog(true)}
                                    title={t('form.alt.more')}
                                    class="text-slate-400 hover:bg-white/20 w-8 h-8 m-2 rounded-md flex items-center justify-center"
                                >
                                    <FiMoreHorizontal size={16} />
                                </button>
                            </span>
                        </div>

                        <div class="text-xs p-1 text-neutral-400">
                            <TextArea value={props.booking.text} placeholder={t('booking.emptyText')}
                                onChange={x => props.dayStore.setBookingText(props.booking, x)}
                                class="min-h-[2.75rem]"
                            />
                        </div>

                    </div>
                </div>
            </div>

            <BookingMenuDialog booking={props.booking} dayStore={props.dayStore}
                show={showMenuDialog()} onClose={() => setShowMenuDialog(false)}
            />

        </div>
    )
}
