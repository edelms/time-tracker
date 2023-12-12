import { render } from "@solidjs/testing-library";
import { ProjectsDialog } from "./ProjectsDialog";
import { SetupContexts } from "@/helpers/SetupContexts";

describe('<ProjectsDialog />', () => {

    it('renders', async () => {
        const { findByTestId, unmount } = render(() => <ProjectsDialog show={true} onClose={() => { }} />, { wrapper: SetupContexts });
        const div = await findByTestId('projects-dialog');
        expect(div).toBeInTheDocument();
        unmount();
    });

});
