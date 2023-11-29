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
        <div class="text-white mb-2 relative isolate">
            <Shimmer enable={isRecording()} class="bg-neutral-700" />
            <div class={clsx(
                "bg-neutral-700 rounded-md overflow-hidden",
                isRecording() && 'outline outline-red-600/40 outline-1',
            )}>
                <div class="flex flex-col bg-neutral-800/50  border-t-4 border-neutral-800">
                    <div class="flex items-center justify-between gap-2 pl-3 pr-4">
                        <span class="flex-1"></span>
                        <div>
                            <TimeBox value={props.booking.start}
                                onChange={x => props.dayStore.setBookingStart(props.booking, x)}
                                autofocus={props.isNew}
                            />
                        </div>
                        <span>-</span>
                        <div>
                            <TimeBox value={props.booking.end}
                                onChange={x => props.dayStore.setBookingEnd(props.booking, x)}
                            />
                        </div>
                        <span class="flex-1 flex items-center justify-end">
                            <button type='button' onclick={() => setShowMenuDialog(true)}>
                                <FiMoreHorizontal size={12} />
                            </button>
                        </span>
                    </div>

                    <div class="flex-1 py-1">
                        <ProjectPicker projectKey={props.booking.projectKey}
                            onChange={x => props.dayStore.setBookingProjectKey(props.booking, x)}
                        />
                    </div>
                </div>

                <div class="text-xs p-1">
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
