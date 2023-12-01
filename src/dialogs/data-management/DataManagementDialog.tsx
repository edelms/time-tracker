import { TbPackageExport, TbPackageImport } from "solid-icons/tb";

import { t } from "@/i18n";
import { exportData } from "@data/db/export";

import { Dialog } from "../Dialog";
import { DialogHeader } from "../DialogHeader";
import { loadJsonFile, saveJsonFile } from "@data/db/save-and-load";
import { importData, verifyData } from "@data/db/import";
import { AiOutlineClear } from "solid-icons/ai";
import { clearAllData } from "@data/db/clear-all";
import { useRecorderStore } from "@data/recorder/context";

type Props = {
    show: boolean;
    onClose(show: boolean): void;
}

export const DataManagementDialog = (props: Props) => {

    const recorderStore = useRecorderStore();

    const handleBackup = async () => {
        const data = await exportData();
        const date = new Date().toISOString().replace(/:/g, '-').substring(0, 19);
        saveJsonFile(`export-${date}.json`, data);
    }

    const handleRestore = async () => {
        try {
            const json = await loadJsonFile();
            if (json) {
                const error = verifyData(json);
                if (error) {
                    alert(t('dataManagement.message.verifyError', { error }));
                    return;
                }

                recorderStore().stop();
                const changes = await importData(json);
                if (changes === 0)
                    alert(t('dataManagement.message.importSuccessNoChange'));
                else {
                    alert(t('dataManagement.message.importSuccessChanged', { changes }));
                    location.reload();
                }
            }
        } catch (err) {
            alert(t('dataManagement.message.importError', { error: (err as Error).message }));
        }
    }

    const handleClearAll = async () => {
        if (prompt(t('dataManagement.message.enterToRemovePrompt')) !== 'REMOVE ALL') return;
        recorderStore().stop();
        await clearAllData();
        alert(t('dataManagement.message.removeSuccess'));
        location.reload();
    }

    return (
        <Dialog show={props.show} onClose={props.onClose}>
            <div class="min-w-[34rem]">
                <DialogHeader text={t('dataManagement.dialog.header')} />

                <ul class="flex items-center justify-center gap-3 p-3">
                    <li class="flex">
                        <button type="button" onclick={handleBackup}
                            class="flex-1 hover:bg-neutral-100/5 px-5 py-3 flex items-center justify-center gap-2"
                        >
                            <TbPackageExport size={20} />
                            <span>{t('form.button.backup')}</span>
                        </button>
                    </li>
                    <li class="flex">
                        <button type="button" onclick={handleRestore}
                            class="flex-1 hover:bg-neutral-100/5 px-5 py-3 flex items-center justify-center gap-2"
                        >
                            <TbPackageImport size={20} />
                            <span>{t('form.button.restore')}</span>
                        </button>
                    </li>
                    <li class="flex">
                        <button type="button" onclick={handleClearAll}
                            class="flex-1 hover:bg-neutral-100/5 px-5 py-3 flex items-center justify-center gap-2"
                        >
                            <AiOutlineClear size={20} />
                            <span>{t('form.button.clearAll')}</span>
                        </button>
                    </li>
                </ul>

                <p class="pt-2 pb-6 px-8 mx-auto max-w-md text-center text-red-400 font-semibold whitespace-pre-wrap">
                    {t('dataManagement.dialog.warning')}
                </p>

            </div>

        </Dialog>
    );
}
