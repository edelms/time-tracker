import { fireEvent, render } from "@solidjs/testing-library";

import { SetupContexts } from "@/helpers/SetupContexts";
import { useCurrentWeekStore } from "@data/week/context-current";
import { BookingMenuDialog } from "./BookingMenuDialog";

describe('<BookingMenuDialog />', () => {

    it('renders', async () => {

        const { findByTestId, unmount } = render(
            () => {
                const booking = useCurrentWeekStore()().today()!.addBooking({});
                const dayStore = useCurrentWeekStore()().today()!;
                return (
                    <BookingMenuDialog
                        dayStore={dayStore}
                        booking={booking}
                        show={true}
                        onClose={() => { }}
                    />
                );
            },
            { wrapper: SetupContexts }
        );

        const div = await findByTestId('booking-menu-dialog');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('removes the booking', async () => {

        const { findByTestId, unmount } = render(
            () => {
                const booking = useCurrentWeekStore()().today()!.addBooking({});
                const dayStore = useCurrentWeekStore()().today()!;
                return (
                    <BookingMenuDialog
                        dayStore={dayStore}
                        booking={booking}
                        show={true}
                        onClose={() => { }}
                    />
                );
            },
            { wrapper: SetupContexts }
        );
        await findByTestId('booking-menu-dialog');

        expect(await getBookingCount()).toBe(1);

        global.confirm = vi.fn(() => true);
        const button = await findByTestId('remove-button');
        fireEvent.click(button);

        expect(await getBookingCount()).toBe(0);
        unmount();
    });

    it('does not remove booking, if confirm is cancelled', async () => {

        const { findByTestId, unmount } = render(
            () => {
                const booking = useCurrentWeekStore()().today()!.addBooking({});
                const dayStore = useCurrentWeekStore()().today()!;
                return (
                    <BookingMenuDialog
                        dayStore={dayStore}
                        booking={booking}
                        show={true}
                        onClose={() => { }}
                    />
                );
            },
            { wrapper: SetupContexts }
        );
        await findByTestId('booking-menu-dialog');

        expect(await getBookingCount()).toBe(1);

        global.confirm = vi.fn(() => false);
        const button = await findByTestId('remove-button');
        fireEvent.click(button);

        expect(await getBookingCount()).toBe(1);
        unmount();
    });

});

async function getBookingCount() {
    const GetCount = () => {
        return <span role="main">{useCurrentWeekStore()().today()!.bookings().length}</span>
    };
    const { findByRole, unmount } = render(() => <GetCount />, { wrapper: SetupContexts });

    const num = await findByRole('main');
    const count = +num.innerHTML;
    unmount();

    return count;
} 
