import { render } from "@solidjs/testing-library";

import { Initializer } from "./Initializer";

describe('<Initializer />', () => {

    it('renders', async () => {
        const { getByTestId, unmount } = render(() => <Initializer />);
        const div = getByTestId('initializer');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('displays message', async () => {
        const { getByText, unmount } = render(() => <Initializer message="from test" />);
        const span = getByText('from test');
        expect(span).toBeInTheDocument();
        unmount();
    });

});
