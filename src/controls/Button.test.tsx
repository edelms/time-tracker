import { fireEvent, render } from '@solidjs/testing-library';

import { Button } from "./Button";

describe('<Button />', () => {

    it('renders', async () => {
        const { getByRole, unmount } = render(() => <Button label='Test Button' />);
        const button = getByRole('button');
        expect(button).toBeInTheDocument();
        unmount();
    });

    it('onClick event works', async () => {

        const cb = vi.fn();

        const { getByRole, unmount } = render(() => <Button label='Test Button' onClick={cb} />);
        const button = getByRole('button');

        fireEvent.click(button);
        expect(cb).toBeCalled();
        unmount();
    });

});