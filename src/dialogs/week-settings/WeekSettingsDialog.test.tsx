import { render } from "@solidjs/testing-library";
import { WeekSettingsDialog } from "./WeekSettingsDialog";
import { SetupContexts } from "@/helpers/SetupContexts";

describe('<WeekSettingsDialog />', () => {

    it('renders', async () => {
        const { findByTestId, unmount } = render(() => <WeekSettingsDialog show={true} onSelect={() => { }} onClose={() => { }} />, { wrapper: SetupContexts });
        const div = await findByTestId('week-settings-dialog');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('displays week setting list', async () => {
        const { findByTestId, unmount } = render(() => <WeekSettingsDialog show={true} onSelect={() => { }} onClose={() => { }} />, { wrapper: SetupContexts });
        const div = await findByTestId('week-setting-list');
        expect(div).toBeInTheDocument();
        unmount();
    });

});
