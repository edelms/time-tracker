/* @refresh reload */
import { render } from 'solid-js/web'

import { ProjectsProvider } from '@data/project/context';
import { RecentProjectsProvider } from '@data/recent-project/context';
import { WeekSettingsProvider } from '@data/week-setting/context';
import { RecorderProvider } from '@data/recorder/context';
import { CurrentWeekProvider } from '@data/week/context-current';
import { ViewingWeekProvider } from '@data/week/context-viewing';

import App from './App'
import './index.css';

const root = document.getElementById('root')

render(() => (
    <WeekSettingsProvider>
        <RecentProjectsProvider>
            <ProjectsProvider>
                <CurrentWeekProvider>
                    <ViewingWeekProvider>
                        <RecorderProvider>
                            <App />
                        </RecorderProvider>
                    </ViewingWeekProvider>
                </CurrentWeekProvider>
            </ProjectsProvider>
        </RecentProjectsProvider>
    </WeekSettingsProvider>
), root!)
