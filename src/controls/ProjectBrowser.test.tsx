import { fireEvent, render } from "@solidjs/testing-library";

import { SetupContexts } from "@/helpers/SetupContexts";
import { useProjectStore } from "@data/project/context";
import { useRecentProjectStore } from "@data/recent-project/context";

import { ProjectBrowser } from "./ProjectBrowser";


describe('<ProjectBrowser />', () => {
    it('renders', async () => {
        const { findByTestId, unmount } = render(() => <ProjectBrowser onSelect={() => { }} />, { wrapper: SetupContexts });
        const div = await findByTestId('project-browser');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('shows search box', async () => {
        const { findByTestId, unmount } = render(() => <ProjectBrowser onSelect={() => { }} />, { wrapper: SetupContexts });
        const searchbox = await findByTestId('project-searchbox') as HTMLInputElement;
        expect(searchbox).toBeInTheDocument();
        unmount();
    });

    it('shows "no matches" message, by default', async () => {
        const { findByTestId, unmount } = render(() => <ProjectBrowser onSelect={() => { }} />, { wrapper: SetupContexts });
        const div = await findByTestId('no-matches-message');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('shows "no matches" message, if projects exists, but no recent projects', async () => {
        await seedTestProjects();

        const { findByTestId, unmount } = render(() => <ProjectBrowser onSelect={() => { }} />, { wrapper: SetupContexts });
        const div = await findByTestId('no-matches-message');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('shows "recent" message, if projects and recent projects exists', async () => {
        await seedTestProjects();
        await seedRecentTestProjects();

        const { findByTestId, unmount } = render(() => <ProjectBrowser onSelect={() => { }} />, { wrapper: SetupContexts });
        const div = await findByTestId('recent-message');
        expect(div).toBeInTheDocument();
        unmount();
    });


    it('shows "no matches" message, after searching without projects', async () => {
        const { findByTestId, unmount } = render(() => <ProjectBrowser onSelect={() => { }} />, { wrapper: SetupContexts });

        const searchbox = await findByTestId('project-searchbox') as HTMLInputElement;
        fireEvent.input(searchbox, { target: { value: 'Testing' } });

        const div = await findByTestId('no-matches-message');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('shows "results" message, after searching with projects', async () => {
        await seedTestProjects();

        const { findByTestId, unmount } = render(() => <ProjectBrowser onSelect={() => { }} />, { wrapper: SetupContexts });

        const searchbox = await findByTestId('project-searchbox') as HTMLInputElement;
        fireEvent.input(searchbox, { target: { value: 'Testing' } });

        const div = await findByTestId('results-message');
        expect(div).toBeInTheDocument();
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

async function seedRecentTestProjects() {
    const { findByRole, unmount } = render(
        () => {
            const recentProjectStore = useRecentProjectStore();
            recentProjectStore().add('TEST-1');
            recentProjectStore().add('TEST-2');
            return <div role='main'></div>
        },
        { wrapper: SetupContexts }
    )
    await findByRole('main');
    unmount();
}
