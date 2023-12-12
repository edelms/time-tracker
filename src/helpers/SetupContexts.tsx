import { JSX } from "solid-js"

import { ProjectsProvider } from "@data/project/context";
import { RecentProjectsProvider } from "@data/recent-project/context";
import { RecorderProvider } from "@data/recorder/context";
import { WeekSettingsProvider } from "@data/week-setting/context";
import { CurrentWeekProvider } from "@data/week/context-current";
import { ViewingWeekProvider } from "@data/week/context-viewing";

type Props = {
    children: JSX.Element | JSX.Element[];
}

export const SetupContexts = (props: Props) => {
    return (
        <WeekSettingsProvider>
            <RecentProjectsProvider>
                <ProjectsProvider>
                    <CurrentWeekProvider>
                        <ViewingWeekProvider>
                            <RecorderProvider>
                                {props.children}
                            </RecorderProvider>
                        </ViewingWeekProvider>
                    </CurrentWeekProvider>
                </ProjectsProvider>
            </RecentProjectsProvider>
        </WeekSettingsProvider>
    );
}
