import { createSignal } from "solid-js";
import { fireEvent, render } from "@solidjs/testing-library";

import { TimeBox } from "./TimeBox";

describe('<TimeBox />', () => {
    it('renders', async () => {
        const { getByTestId, unmount } = render(() => <TimeBox value={120} />);
        const input = getByTestId('time-box') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        unmount();
    });

    it('displays formatted value', async () => {
        const { getByTestId, unmount } = render(() => <TimeBox value={120} />);
        const input = getByTestId('time-box') as HTMLInputElement;
        expect(input.value).toBe('02:00');
        unmount();
    });

    it('changes value', async () => {
        const [value, setValue] = createSignal(120);

        const { getByTestId, unmount } = render(() => <TimeBox value={value()} onChange={setValue} />);
        const input = getByTestId('time-box') as HTMLInputElement;
        expect(input.value).toBe('02:00');

        fireEvent.change(input, { target: { value: '3:00' } });
        expect(value()).toBe(180);
        expect(input.value).toBe('03:00');

        unmount();
    });

    it('sets validation error', async () => {
        const [value, setValue] = createSignal(120);

        const { getByTestId, unmount } = render(() => <TimeBox value={value()} onChange={setValue} />);
        const input = getByTestId('time-box') as HTMLInputElement;

        fireEvent.change(input, { target: { value: 'hello' } });
        expect(input.validationMessage).toBeTruthy();
        unmount();
    });

});
