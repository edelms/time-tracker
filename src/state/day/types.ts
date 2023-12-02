export type Timebooking = {
    id: string;

    /** Minutes starting at 00:00 */
    start: number;

    /** Minutes starting at 00:00 */
    end: number;

    projectKey: string;
    text: string;
}

export type DayMode = 'office' | 'homeoffice' | 'free';


export type DayStoreAccessor = {
    id(): string;
    bookings(): Timebooking[];
    bookingsWithGaps(): (Timebooking | undefined)[];
    bookingById(id: string): Timebooking | undefined;

    addBooking(data: Partial<Timebooking>): Timebooking;
    removeBooking(booking: Timebooking): void;
    setBookingText(booking: Timebooking, text: string): void;
    setBookingStart(booking: Timebooking, start: number): void;
    setBookingEnd(booking: Timebooking, end: number): void;
    setBookingProjectKey(booking: Timebooking, projectKey: string): void;

    dayMode(): DayMode;
    isFree(): boolean;
    toggleDayMode(): void;

    calcTotalHours(): number;
}
