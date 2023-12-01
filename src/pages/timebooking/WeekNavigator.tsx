import { Show, createSignal } from 'solid-js';
import { startOfISOWeek, lastDayOfISOWeek, getISOWeek, format, add } from 'date-fns';
import { TbHome, TbSettings } from 'solid-icons/tb';
import { VsDebugStop, VsPlay, VsDatabase, VsArchive } from 'solid-icons/vs';
import { IoChevronBackOutline, IoChevronForwardOutline } from 'solid-icons/io';

import { t } from '@/i18n';
import { useRecorderStore } from '@data/recorder/context';
import { useViewingWeek, useViewingWeekStore } from '@data/week/context-viewing';
import { Shimmer } from '@/components/Shimmer';
import { WeekSettingsDialog } from '@/dialogs/week-settings/WeekSettingsDialog';
import { ProjectsDialog } from '@/dialogs/projects/ProjectsDialog';
import { DataManagementDialog } from '@/dialogs/data-management/DataManagementDialog';




export const WeekNavigator = () => {

    const [viewingWeek, setViewingWeek] = useViewingWeek();
    const calendarWeek = () => getISOWeek(viewingWeek());
    const startOfWeek = () => viewingWeek();
    const endOfWeek = () => lastDayOfISOWeek(viewingWeek());
    const formattedStartOfWeek = () => format(startOfWeek(), 'dd.MM.yyyy');
    const formattedEndOfWeek = () => format(endOfWeek(), 'dd.MM.yyyy');

    const gotoNextWeek = () => setViewingWeek(x => add(x, { weeks: 1 }));
    const gotoPrevWeek = () => setViewingWeek(x => add(x, { weeks: -1 }));
    const gotoCurrentWeek = () => {
        const newWeek = startOfISOWeek(new Date());
        if (viewingWeek().getTime() !== newWeek.getTime())
            setViewingWeek(newWeek);
    };

    const weekStore = useViewingWeekStore();
    const recorderStore = useRecorderStore();

    const [showWeekSettings, setShowWeekSettings] = createSignal(false);
    const [showProjects, setShowProjects] = createSignal(false);
    const [showDataManagement, setShowDataManagement] = createSignal(false);


    return (
        <>
            <div class="flex items-center justify-center gap-2 bg-neutral-800 text-neutral-300 p-2 rounded-lg text-sm">
                <button type='button' title={t('calendar.navigate.prevWeek')}
                    class="flex items-center justify-center rounded-md w-8 h-8 bg-orange-700 text-white hover:bg-orange-800"
                    onclick={gotoPrevWeek}
                >
                    <IoChevronBackOutline size={20} />
                </button>

                <button type='button' title={t('calendar.navigate.currentWeek')}
                    onclick={gotoCurrentWeek}
                    class="flex items-center justify-center rounded-md w-8 h-8 bg-orange-700 text-white hover:bg-orange-800"
                >
                    <TbHome size={20} />
                </button>

                <div class='mx-2'>
                    <Show when={!recorderStore().isRecording()}>
                        <button type='button' title={t('calendar.navigate.record')}
                            onclick={() => recorderStore().start()}
                            class="flex items-center justify-center rounded-md w-8 h-8 bg-emerald-700 text-white hover:bg-emerald-800"
                        >
                            <VsPlay size={20} />
                        </button>
                    </Show>

                    <Show when={recorderStore().isRecording()}>
                        <div class='relative isolate'>
                            <Shimmer enable={true} />
                            <button type='button' title={t('calendar.navigate.stopRecord')}
                                onclick={() => recorderStore().stop()}
                                class="flex items-center justify-center rounded-md w-8 h-8 bg-rose-700 text-white hover:bg-rose-800"
                            >
                                <VsDebugStop size={20} />
                            </button>
                        </div>
                    </Show>
                </div>

                <span class="flex-1 text-center"><strong>
                    {t('calendar.calendarWeek.short')} {calendarWeek()} </strong>
                    ({formattedStartOfWeek()} - {formattedEndOfWeek()})
                </span>


                <div class='mx-2 flex items-center gap-2'>
                    <button type='button' title={t('calendar.navigate.projectList')}
                        onclick={() => setShowProjects(true)}
                        class="flex items-center justify-center rounded-md w-8 h-8 bg-slate-700 text-white hover:bg-slate-800"
                    >
                        <VsArchive size={20} />
                    </button>

                    <button type='button' title={t('calendar.navigate.dataMgmt')}
                        onclick={() => setShowDataManagement(true)}
                        class="flex items-center justify-center rounded-md w-8 h-8 bg-slate-700 text-white hover:bg-slate-800"
                    >
                        <VsDatabase size={20} />
                    </button>

                </div>

                <button type='button' title={t('calendar.navigate.weekSettings')}
                    onclick={() => setShowWeekSettings(true)}
                    class="flex items-center justify-center rounded-md w-8 h-8 bg-orange-700 text-white hover:bg-orange-800"
                >
                    <TbSettings size={20} />
                </button>

                <button type='button' title={t('calendar.navigate.nextWeek')}
                    onclick={gotoNextWeek}
                    class="flex items-center justify-center rounded-md w-8 h-8 bg-orange-700 text-white hover:bg-orange-800"
                >
                    <IoChevronForwardOutline size={20} />
                </button>
            </div >

            <WeekSettingsDialog show={showWeekSettings()} onClose={setShowWeekSettings}
                onSelect={x => weekStore().setWeekSettingId(x.id)}
            />

            <ProjectsDialog show={showProjects()} onClose={setShowProjects} />

            <DataManagementDialog show={showDataManagement()} onClose={setShowDataManagement} />
        </>
    );
}
