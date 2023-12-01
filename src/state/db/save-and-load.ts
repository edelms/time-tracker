import { t } from "@/i18n";

export const saveJsonFile = (filename: string, data: any) => {

    const blob = new Blob([JSON.stringify(data)], { type: 'application/json' });
    const objectUrl = URL.createObjectURL(blob);
    try {
        const linkElement = document.createElement('a');
        linkElement.href = objectUrl;
        linkElement.download = filename;
        linkElement.click();
        linkElement.remove();
    } finally {
        setTimeout(() => URL.revokeObjectURL(objectUrl), 5000);
    }
}

export const loadJsonFile = <T>() => {

    return new Promise<T | undefined>((resolve, reject) => {
        const input = document.createElement('input');
        input.type = 'file';

        input.onchange = async () => {

            if (input.files?.length !== 1) {
                reject(new Error(t('dataManagement.error.selectSingleFile')!));
                return;
            }

            const file = input.files[0];
            if (file.type !== 'application/json') {
                reject(new Error(t('dataManagement.error.selectJsonFile')!));
                return;
            }

            try {
                const text = await file.text();
                const data = JSON.parse(text);
                resolve(data);
            } catch (err) {
                reject(new Error(t('dataManagement.error.openJsonError', { error: (err as Error).message })!));
            }
        }

        input.oncancel = () => {
            resolve(undefined);
        }

        input.click();
        input.remove();
    });
}