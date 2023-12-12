import { render } from "@solidjs/testing-library";

import { SetupContexts } from "@/helpers/SetupContexts";
import { useProjectStore } from "@data/project/context";

import { ProjectList } from "./ProjectList";

describe('<ProjectList />', () => {

    it('renders', async () => {
        const { findByTestId, unmount } = render(() => <ProjectList />, { wrapper: SetupContexts });
        const div = await findByTestId('project-list');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('without projects', async () => {
        const { findByTestId, queryByTestId, unmount } = render(() => <ProjectList />, { wrapper: SetupContexts });
        await findByTestId('project-list');

        const item = queryByTestId('project-item');
        expect(item).not.toBeInTheDocument();
        unmount();
    });

    it('with projects', async () => {
        await seedTestProjects();

        const { findByTestId, queryAllByTestId, unmount } = render(() => <ProjectList />, { wrapper: SetupContexts });
        await findByTestId('project-list');

        const items = await queryAllByTestId('project-item');
        expect(items).toHaveLength(2);
        items.forEach(x => expect(x).toBeInTheDocument());
        unmount();
    });

});


async function seedTestProjects() {
    const { findByRole, unmount } = render(
        () => {
            const projectStore = useProjectStore();
            projectStore().add('TEST-1', 'Testing project 1');
            projectStore().add('TEST-2', 'Testing project 2');
            return <div role='main'></div>
        },
        { wrapper: SetupContexts }
    )
    await findByRole('main');
    unmount();
}