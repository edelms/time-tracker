import { render } from "@solidjs/testing-library";

import { InputGroup } from "./InputGroup";

describe('<InputGroup />', () => {

    it('renders', async () => {
        const { getByTestId, unmount } = render(() => <InputGroup><span>testing</span></InputGroup>);
        const element = getByTestId('input-group');
        expect(element).toBeInTheDocument();
        unmount();
    });

    it('renders children', async () => {
        const { getByTestId, unmount } = render(() => <InputGroup><span>testing</span></InputGroup>);
        const element = getByTestId('input-group');
        expect(element.children.length).toBe(1);
        unmount();
    });

});
