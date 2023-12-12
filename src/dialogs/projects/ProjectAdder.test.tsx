import { fireEvent, render } from "@solidjs/testing-library";

import { SetupContexts } from "@/helpers/SetupContexts";
import { useProjectStore } from "@data/project/context";

import { ProjectAdder } from "./ProjectAdder";


describe('<ProjectAdder />', () => {

    it('renders', async () => {
        const { findByTestId, unmount } = render(() => <ProjectAdder />, { wrapper: SetupContexts });
        const form = await findByTestId('project-adder');
        expect(form).toBeInTheDocument();
        unmount();
    });

    it('fails on empty project key', async () => {
        const { findByTestId, findByRole, unmount } = render(() => <ProjectAdder />, { wrapper: SetupContexts });

        const name = await findByTestId('name-input') as HTMLInputElement;
        fireEvent.change(name, { target: { value: 'Test Name' } });

        const submit = await findByRole('button');
        fireEvent.click(submit);

        const key = await findByTestId('key-input') as HTMLInputElement;
        expect(key.validationMessage).toBeTruthy();
        expect(await isProjectStoreEmpty()).toBeTruthy();
        unmount();
    });

    it('fails on existing project key', async () => {
        await seedTestProjects();

        const { findByTestId, findByRole, unmount } = render(() => <ProjectAdder />, { wrapper: SetupContexts });

        const key = await findByTestId('key-input') as HTMLInputElement;
        fireEvent.change(key, { target: { value: 'TEST-1' } });

        const name = await findByTestId('name-input') as HTMLInputElement;
        fireEvent.change(name, { target: { value: 'Test Project' } });

        const submit = await findByRole('button');
        fireEvent.click(submit);

        expect(key.validationMessage).toBeTruthy();
        unmount();
    });

    it('created project should be in store', async () => {
        await seedTestProjects();

        const { findByTestId, findByRole, unmount } = render(() => <ProjectAdder />, { wrapper: SetupContexts });

        const key = await findByTestId('key-input') as HTMLInputElement;
        fireEvent.change(key, { target: { value: 'TEST-2' } });

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

async function isProjectStoreEmpty() {
    const { findByRole, unmount } = render(
        () => {
            const projectStore = useProjectStore();
            return <div role='main'>{projectStore().all().length === 0 ? '1' : ''}</div>
        },
        { wrapper: SetupContexts }
    )
    const value = (await findByRole('main')).innerHTML;
    unmount();
    return value === '1';
}
