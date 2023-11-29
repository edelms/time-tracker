import { Timebooking } from "@data/day/types";

export type RecorderStoreAccessor = {

    bookingId(): string;
    isRecording(): boolean;
    allowRecord(): boolean;

    start(): Timebooking | undefined;
    stop(): void;
}
