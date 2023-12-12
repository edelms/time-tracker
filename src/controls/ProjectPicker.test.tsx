import { fireEvent, render } from "@solidjs/testing-library";

import { SetupContexts } from "@/helpers/SetupContexts";
import { ProjectPicker } from "./ProjectPicker";


describe('<ProjectPicker />', () => {


    it('renders', async () => {
        const { findByTestId, unmount } = render(() => <ProjectPicker projectKey="TEST-1" onChange={() => { }} />, { wrapper: SetupContexts });
        const div = await findByTestId('project-picker');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('browser should not render', async () => {
        const { findByTestId, queryByTestId, unmount } = render(() => <ProjectPicker projectKey="TEST-1" onChange={() => { }} />, { wrapper: SetupContexts });
        await findByTestId('project-picker');

        const div = queryByTestId('project-browser');
        expect(div).not.toBeInTheDocument();
        unmount();
    });

    it('browser renders after select clicked', async () => {
        const { findByTestId, queryByTestId, unmount } = render(() => <ProjectPicker projectKey="TEST-1" onChange={() => { }} />, { wrapper: SetupContexts });
        await findByTestId('project-picker');

        const button = await findByTestId('select-button');
        fireEvent.click(button);

        const div = queryByTestId('project-browser');
        expect(div).toBeInTheDocument();
        unmount();
    });

});