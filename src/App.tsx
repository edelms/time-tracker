import { TimebookingPage } from "@pages/timebooking/TimebookingPage"
import { InitializeI18n } from "./i18n"
import { FiGithub } from "solid-icons/fi"


function App() {
    return (
        <div class="flex flex-col gap-3 m-3">
            <InitializeI18n>
                <TimebookingPage />
            </InitializeI18n>

            <div class="fixed z-10 right-3 bottom-2 text-xs text-neutral-200 opacity-30 hover:opacity-70 flex gap-2 items-center">
                <span class="pointer-events-none">V {APP_VERSION}</span>
                <a href="https://github.com/edelms/time-tracker" target="_blank" aria-label="Open the project on github">
                    <FiGithub />
                </a>
            </div>
        </div>
    )
}

export default App
