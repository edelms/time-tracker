import { TimebookingPage } from "@pages/timebooking/TimebookingPage"
import { InitializeI18n } from "./i18n"


function App() {
    return (
        <div class="flex flex-col gap-3 m-3">
            <InitializeI18n>
                <TimebookingPage />
            </InitializeI18n>
        </div>
    )
}

export default App
