import { render } from "@solidjs/testing-library";
import { DataManagementDialog } from "./DataManagementDialog";
import { SetupContexts } from "@/helpers/SetupContexts";

describe('<DataManagementDialog />', () => {

    it('renders', async () => {
        const { findByTestId, unmount } = render(() => <DataManagementDialog show={true} onClose={() => { }} />, { wrapper: SetupContexts });
        const div = await findByTestId('data-management-dialog');
        expect(div).toBeInTheDocument();
        unmount();
    });

});
