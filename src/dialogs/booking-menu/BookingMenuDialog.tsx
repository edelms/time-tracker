import { DayStoreAccessor, Timebooking } from "@data/day/types";
import { t } from "@/i18n";
import { IoTrash } from "solid-icons/io";

import { Dialog } from "../Dialog";
import { DialogHeader } from "../DialogHeader";

type Props = {
    booking: Timebooking;
    dayStore: DayStoreAccessor;

    show: boolean;
    onClose(show: boolean): void;
}

export const BookingMenuDialog = (props: Props) => {

    const handleRemove = () => {
        if (!confirm(t('booking.edit.removeConfirm'))) return;
        props.dayStore.removeBooking(props.booking);
    }

    return (
        <Dialog show={props.show} onClose={props.onClose}>
            <div data-testid="booking-menu-dialog" class="min-w-[34rem]">
                <DialogHeader text={t('booking.edit.dialogHeader')} />

                <ul class="flex items-center justify-center gap-3 p-3">
                    <li class="flex">
                        <button data-testid="remove-button" type="button" onclick={handleRemove}
                            class="flex-1 hover:bg-neutral-100/5 px-5 py-3 flex items-center justify-center gap-2"
                        >
                            <IoTrash size={20} />
                            <span>{t('form.button.remove')}</span>
                        </button>
                    </li>
                </ul>

            </div>

        </Dialog>
    );
}
