import { fireEvent, render } from "@solidjs/testing-library";

import { SetupContexts } from "@/helpers/SetupContexts";
import { useProjectStore } from "@data/project/context";

import { ProjectCreator } from "./ProjectCreator";

describe('<ProjectCreator />', () => {

    it('renders', async () => {
        const { findByTestId, unmount } = render(() => <ProjectCreator projectKey="test-1" onProjectCreated={() => { }} />, { wrapper: SetupContexts });
        const form = await findByTestId('project-creator');
        expect(form).toBeInTheDocument();
        unmount();
    });

    it('defaults key input with uppercase of prop value', async () => {
        const { findByTestId, unmount } = render(() => <ProjectCreator projectKey="test-1" onProjectCreated={() => { }} />, { wrapper: SetupContexts });
        const key = await findByTestId('key-input') as HTMLInputElement;
        expect(key.value).toBe('TEST-1');
        unmount();
    });

    it('fails on empty project key', async () => {
        const cb = vi.fn();
        const { findByTestId, findByRole, unmount } = render(() => <ProjectCreator projectKey="" onProjectCreated={cb} />, { wrapper: SetupContexts });

        const submit = await findByRole('button');
        fireEvent.click(submit);

        const key = await findByTestId('key-input') as HTMLInputElement;
        expect(key.validationMessage).toBeTruthy();
        expect(cb).not.toBeCalled();
        unmount();
    });

    it('fails on empty project name', async () => {
        const cb = vi.fn();
        const { findByTestId, findByRole, unmount } = render(() => <ProjectCreator projectKey="test-1" onProjectCreated={cb} />, { wrapper: SetupContexts });

        const submit = await findByRole('button');
        fireEvent.click(submit);

        const name = await findByTestId('name-input') as HTMLInputElement;
        expect(name.validationMessage).toBeTruthy();
        expect(cb).not.toBeCalled();
        unmount();
    });

    it('fails on existing project key', async () => {
        await seedTestProjects();

        const cb = vi.fn();
        const { findByTestId, findByRole, unmount } = render(() => <ProjectCreator projectKey="TEST-1" onProjectCreated={cb} />, { wrapper: SetupContexts });

        const name = await findByTestId('name-input') as HTMLInputElement;
        fireEvent.change(name, { target: { value: 'Test Project' } });

        const submit = await findByRole('button');
        fireEvent.click(submit);

        const key = await findByTestId('key-input') as HTMLInputElement;
        expect(key.validationMessage).toBeTruthy();
        expect(cb).not.toBeCalled();
        unmount();
    });

    it('calls onProjectCreated', async () => {
        await seedTestProjects();

        const cb = vi.fn();
        const { findByTestId, findByRole, unmount } = render(() => <ProjectCreator projectKey="TEST-2" onProjectCreated={cb} />, { wrapper: SetupContexts });

        const name = await findByTestId('name-input') as HTMLInputElement;
        fireEvent.change(name, { target: { value: 'Test Project' } });

        const submit = await findByRole('button');
        fireEvent.click(submit);

        expect(cb).toBeCalled();
        unmount();
    });

    it('created project should be in store', async () => {
        await seedTestProjects();

        const { findByTestId, findByRole, unmount } = render(() => <ProjectCreator projectKey="TEST-2" onProjectCreated={() => { }} />, { wrapper: SetupContexts });

        const name = await findByTestId('name-input') as HTMLInputElement;
        fireEvent.change(name, { target: { value: 'Test Project' } });

        const submit = await findByRole('button');
        fireEvent.click(submit);

        expect(await isKeyInProjectStore('TEST-2')).toBeTruthy();
        unmount();
    });

});

async function seedTestProjects() {
    const { findByRole, unmount } = render(
        () => {
            const projectStore = useProjectStore();
            projectStore().add('TEST-1', 'Testing project 1');
            return <div role='main'></div>
        },
        { wrapper: SetupContexts }
    )
    await findByRole('main');
    unmount();
}

async function isKeyInProjectStore(key: string) {
    const { findByRole, unmount } = render(
        () => {
            const projectStore = useProjectStore();
            return <div role='main'>{projectStore().byKey(key) ? '1' : ''}</div>
        },
        { wrapper: SetupContexts }
    )
    const value = (await findByRole('main')).innerHTML;
    unmount();
    return value === '1';
}
