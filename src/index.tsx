/* @refresh reload */
import { render } from 'solid-js/web'

import { SetupContexts } from './helpers/SetupContexts';
import App from './App'
import './index.css';

const root = document.getElementById('root')

render(() => (
    <SetupContexts>
        <App />
    </SetupContexts>
), root!)
