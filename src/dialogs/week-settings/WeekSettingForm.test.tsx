import { fireEvent, render } from "@solidjs/testing-library";

import { SetupContexts } from "@/helpers/SetupContexts";
import { useWeekSettingStore } from "@data/week-setting/context";

import { WeekSettingForm } from "./WeekSettingForm";

describe('<WeekSettingForm />', () => {

    it('renders', async () => {
        await seedTestWeekSettings();

        const { findByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return (
                    <WeekSettingForm setting={weekSetting} onDismiss={() => { }} />
                )
            }, { wrapper: SetupContexts }
        );
        const div = await findByTestId('week-setting-form');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('renders 7 days', async () => {
        await seedTestWeekSettings();

        const { findByTestId, queryAllByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return (
                    <WeekSettingForm setting={weekSetting} onDismiss={() => { }} />
                )
            }, { wrapper: SetupContexts }
        );
        await findByTestId('week-setting-form');

        const days = queryAllByTestId('day-form');

        expect(days).toHaveLength(7);
        unmount();
    });

    it('calls onDismiss on close', async () => {
        await seedTestWeekSettings();

        const cb = vi.fn();
        const { findByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return (
                    <WeekSettingForm setting={weekSetting} onDismiss={cb} />
                )
            }, { wrapper: SetupContexts }
        );
        const btn = await findByTestId('close-button');
        fireEvent.click(btn);

        expect(cb).toBeCalled();
        unmount();
    });

    it('removes from store', async () => {
        await seedTestWeekSettings();

        const { findByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return (
                    <WeekSettingForm setting={weekSetting} onDismiss={() => { }} />
                )
            }, { wrapper: SetupContexts }
        );

        global.confirm = vi.fn(() => true);
        const btn = await findByTestId('remove-button');
        fireEvent.click(btn);

        expect(await countWeekSettings()).toBe(0);
        unmount();
    });

    it('does not remove from store, if confirm is cancelled', async () => {
        await seedTestWeekSettings();

        const { findByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return (
                    <WeekSettingForm setting={weekSetting} onDismiss={() => { }} />
                )
            }, { wrapper: SetupContexts }
        );

        global.confirm = vi.fn(() => false);
        const btn = await findByTestId('remove-button');
        fireEvent.click(btn);

        expect(await countWeekSettings()).not.toBe(0);
        unmount();
    });


    it('changes name in store', async () => {
        await seedTestWeekSettings();

        const cb = vi.fn();
        const { findByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return (
                    <WeekSettingForm setting={weekSetting} onDismiss={cb} />
                )
            }, { wrapper: SetupContexts }
        );
        const input = await findByTestId('name-input');
        fireEvent.change(input, { target: { value: 'New Name' } });

        expect(await getName()).toBe('New Name');
        unmount();
    });

    it('renders set default button, and not is default message', async () => {
        await seedTestWeekSettings();

        const cb = vi.fn();
        const { findByTestId, queryByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return (
                    <WeekSettingForm setting={weekSetting} onDismiss={cb} />
                )
            }, { wrapper: SetupContexts }
        );

        const btn = await findByTestId('set-default-button');
        const msg = queryByTestId('is-default-message');
        expect(btn).toBeInTheDocument();
        expect(msg).not.toBeInTheDocument();
        unmount();
    });

    it('renders is default message, and not set default button', async () => {
        await seedTestWeekSettings();

        const cb = vi.fn();
        const { findByTestId, queryByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return (
                    <WeekSettingForm setting={weekSetting} onDismiss={cb} />
                )
            }, { wrapper: SetupContexts }
        );

        const btn = await findByTestId('set-default-button');
        fireEvent.click(btn);

        const btnAterClick = queryByTestId('set-default-button');
        const msg = await findByTestId('is-default-message');
        expect(msg).toBeInTheDocument();
        expect(btnAterClick).not.toBeInTheDocument();
        unmount();
    });

});

async function seedTestWeekSettings() {
    const { findByRole, unmount } = render(
        () => {
            const weekSettingsStore = useWeekSettingStore();
            weekSettingsStore().add({ name: 'Test Setting' });
            return <div role='main'></div>
        },
        { wrapper: SetupContexts }
    )
    await findByRole('main');
    unmount();
}

async function getName() {
    const { findByRole, unmount } = render(
        () => {
            const weekSettingStore = useWeekSettingStore();
            return <div role='main'>{weekSettingStore().all()[0].name}</div>;
        },
        { wrapper: SetupContexts }
    );
    const value = (await findByRole('main')).innerHTML;
    unmount();
    return value;
}

async function countWeekSettings() {
    const { findByRole, unmount } = render(
        () => {
            const weekSettingStore = useWeekSettingStore();
            return <div role='main'>{weekSettingStore().all().length}</div>;
        },
        { wrapper: SetupContexts }
    );
    const value = +(await findByRole('main')).innerHTML;
    unmount();
    return value;
}