import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { PlayerProvider } from './Player/PlayerContext';
import { TimerProvider } from './TurnTimer/TimerContext';

ReactDOM.render(
    <PlayerProvider>
        <TimerProvider>
            <App />
        </TimerProvider>
    </PlayerProvider>,
    document.getElementById('root'));
