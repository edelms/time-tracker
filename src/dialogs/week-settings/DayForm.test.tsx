import { fireEvent, render } from "@solidjs/testing-library";

import { SetupContexts } from "@/helpers/SetupContexts";
import { useWeekSettingStore } from "@data/week-setting/context";

import { DayForm } from "./DayForm";

describe('<DayForm />', () => {

    it('renders', async () => {
        await seedTestWeekSettings();

        const { findByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return <DayForm setting={weekSetting} day={0} />
            },
            { wrapper: SetupContexts }
        );

        const div = await findByTestId('day-form');
        expect(div).toBeInTheDocument();
        unmount();
    });

    it('toggles visibility', async () => {
        await seedTestWeekSettings();

        const { findByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return <DayForm setting={weekSetting} day={0} />
            },
            { wrapper: SetupContexts }
        );

        const isVisibleBefore = await getShow(0);
        const checkbox = await findByTestId('visible-checkbox') as HTMLInputElement;
        fireEvent.click(checkbox);
        const isVisibleAfter = await getShow(0);

        expect(isVisibleBefore).not.toBe(isVisibleAfter);
        unmount();
    });

    it('changes time quota', async () => {
        await seedTestWeekSettings();

        const { findByTestId, unmount } = render(
            () => {
                const weekSettingStore = useWeekSettingStore();
                const weekSetting = weekSettingStore().all()[0];
                return <DayForm setting={weekSetting} day={0} />
            },
            { wrapper: SetupContexts }
        );

        const quotaBefore = await getQuota(0);
        const timeBox = await findByTestId('time-box') as HTMLInputElement;
        fireEvent.change(timeBox, { target: { value: '4:00' } });
        const quotaAfter = await getQuota(0);

        expect(quotaBefore).not.toBe(quotaAfter);
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

async function getShow(day: Day) {
    const { findByRole, unmount } = render(
        () => {
            const weekSettingsStore = useWeekSettingStore();
            return <div role='main'>{weekSettingsStore().all()[0].days[day].show ? '1' : ''}</div>
        },
        { wrapper: SetupContexts }
    )
    const value = (await findByRole('main')).innerHTML;
    unmount();
    return value === '1';
}

async function getQuota(day: Day) {
    const { findByRole, unmount } = render(
        () => {
            const weekSettingsStore = useWeekSettingStore();
            return <div role='main'>{weekSettingsStore().all()[0].days[day].timeQuota}</div>
        },
        { wrapper: SetupContexts }
    )
    const value = (await findByRole('main')).innerHTML;
    unmount();
    return value;
}