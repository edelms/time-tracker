import { fireEvent, render } from "@solidjs/testing-library";
import { createSignal } from "solid-js";

import { TextArea } from "./TextArea";

describe('<TextArea />', () => {
    it('renders', async () => {
        const { getByTestId, unmount } = render(() => <TextArea value="" />);
        const textarea = getByTestId('text-area') as HTMLTextAreaElement;
        expect(textarea).toBeInTheDocument();
        unmount();
    });

    it('has value', async () => {
        const { getByTestId, unmount } = render(() => <TextArea value="Testvalue" />);
        const textarea = getByTestId('text-area') as HTMLTextAreaElement;
        expect(textarea.value).toBe('Testvalue');
        unmount();
    });

    it('changes value', async () => {
        const [value, setValue] = createSignal('Testvalue');

        const { getByTestId, unmount } = render(() => <TextArea value={value()} onChange={setValue} />);
        const textarea = getByTestId('text-area') as HTMLTextAreaElement;
        expect(textarea.value).toBe('Testvalue');

        fireEvent.change(textarea, { target: { value: 'Test 2' } });
        expect(value()).toBe('Test 2');
        expect(textarea.value).toBe('Test 2');

        unmount();
    });

});
