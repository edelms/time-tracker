import { t } from "@/i18n";
import { Dialog } from "../Dialog";
import { DialogHeader } from "../DialogHeader";
import { ProjectList } from "./ProjectList";

type Props = {
    show: boolean;
    onClose(show: boolean): void;
}

export const ProjectsDialog = (props: Props) => {

    const handleClose = () => {
        props.onClose(false);
    }


    return (
        <Dialog show={props.show} onClose={handleClose}>
            <div data-testid="projects-dialog" class="min-w-[34rem]">
                <DialogHeader text={t('project.list.dialogHeader')} />
                <ProjectList />
            </div>

        </Dialog>
    );
}
