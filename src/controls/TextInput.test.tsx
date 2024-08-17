import { createSignal } from "solid-js";
import { fireEvent, render } from "@solidjs/testing-library";

import { TextInput } from "./TextInput";

describe('<TextInput />', () => {
    it('renders', async () => {
        const { getByTestId, unmount } = render(() => <TextInput value="" testId="test-input" />);
        const input = getByTestId('test-input') as HTMLInputElement;
        expect(input).toBeInTheDocument();
        unmount();
    });

    it('renders label', async () => {
        const { getByText, unmount } = render(() => <TextInput value="" label="Testlabel" />);
        const input = getByText('Testlabel');
        expect(input).toBeInTheDocument();
        unmount();
    });

    it('renders validation error', async () => {
        const { getByText, unmount } = render(() => <TextInput value="" showValidation={true} validationError="Testerror" />);
        const input = getByText('Testerror');
        expect(input).toBeInTheDocument();
        unmount();
    });

    it('has value', async () => {
        const { getByTestId, unmount } = render(() => <TextInput value="Testvalue" testId="test-input" />);
        const input = getByTestId('test-input') as HTMLInputElement;
        expect(input.value).toBe('Testvalue');
        unmount();
    });

    it('changes value', async () => {
        const [value, setValue] = createSignal('Testvalue');

        const { getByTestId, unmount } = render(() => <TextInput value={value()} onChange={setValue} testId="test-input" />);
        const input = getByTestId('test-input') as HTMLInputElement;
        expect(input.value).toBe('Testvalue');

        fireEvent.change(input, { target: { value: 'Test 2' } });
        expect(value()).toBe('Test 2');
        expect(input.value).toBe('Test 2');

        unmount();
    });

});
