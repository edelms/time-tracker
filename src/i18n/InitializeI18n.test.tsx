import { render } from "@solidjs/testing-library";

import { assignT, InitializeI18n } from "./InitializeI18n";

describe('<InitializeI18n />', () => {

    it('renders', async () => {
        assignT(undefined as any);

        const { findByRole, unmount } = render(() => <InitializeI18n><span role='main'></span></InitializeI18n>);
        const main = await findByRole('main');
        expect(main).toBeInTheDocument();
        unmount();
    });

    it('fallback to en', async () => {
        assignT(undefined as any);
        Object.defineProperty(window.navigator, 'language', { value: '--unknown--', configurable: true });

        const { findByRole, unmount } = render(() => <InitializeI18n><span role='main'></span></InitializeI18n>);
        const main = await findByRole('main');
        expect(main).toBeInTheDocument();
        unmount();
    });

});
