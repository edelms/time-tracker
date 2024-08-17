import { fireEvent, render } from "@solidjs/testing-library";

import { SetupContexts } from "@/helpers/SetupContexts";
import { useWeekSettingStore } from "@data/week-setting/context";

import { WeekSettingList } from "./WeekSettingList";

describe('<WeekSettingList />', () => {

    it('renders', async () => {
        const { findByTestId, unmount } = render(() => <WeekSettingList onSelect={() => { }} onEdit={() => { }} />, { wrapper: SetupContexts });
        const div = await findByTestId('week-setting-list');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('adds item to list', async () => {
        const { queryAllByTestId, findByTestId, unmount } = render(() => <WeekSettingList onSelect={() => { }} onEdit={() => { }} />, { wrapper: SetupContexts });
        await findByTestId('week-setting-list');

        const items = queryAllByTestId('item');
        expect(items).toHaveLength(0);

        const addBtn = await findByTestId('add-button');
        fireEvent.click(addBtn);

        const itemsAfterAdd = queryAllByTestId('item');
        expect(itemsAfterAdd).toHaveLength(1);

        unmount();
    });

    it('select button calls onSelect', async () => {
        await seedTestWeekSettings();

        const cb = vi.fn();
        const { findByTestId, unmount } = render(() => <WeekSettingList onSelect={cb} onEdit={() => { }} />, { wrapper: SetupContexts });

        const selectBtn = await findByTestId('select-button');
        fireEvent.click(selectBtn);

        expect(cb).toBeCalled();
        unmount();
    });

    it('edit button calls onEdit', async () => {
        await seedTestWeekSettings();

        const cb = vi.fn();
        const { findByTestId, unmount } = render(() => <WeekSettingList onSelect={() => { }} onEdit={cb} />, { wrapper: SetupContexts });

        const editBtn = await findByTestId('edit-button');
        fireEvent.click(editBtn);

        expect(cb).toBeCalled();
        unmount();
    });

});

async function seedTestWeekSettings() {
    const { findByRole, unmount } = render(
        () => {
            const weekSettingsStore = useWeekSettingStore();
            weekSettingsStore().add({});
            return <div role='main'></div>
        },
        { wrapper: SetupContexts }
    )
    await findByRole('main');
    unmount();
}