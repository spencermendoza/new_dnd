import React, { Component } from 'react';
import { FAKE_PLAYERS, togglePlayerActive, sortPlayersBy } from '../Player/playerHelpers';

const TimerContext = React.createContext();
const { Provider, Consumer } = TimerContext;

class TimerProvider extends Component {

    state = {
        minutes: 2,
        seconds: 0,
        bName: 'Start Timer!',
        players: FAKE_PLAYERS,
        currentHighest: '',
        sortBy: sortPlayersBy,
        playerIndex: 0,
        togglePlayerActive: this.handleTogglePlayerActive
    };

    nextHighestInit = () => {
        const { players } = this.state;
        sortPlayersBy(players, 'initiative');
    }

    timerStart = () => {
        this.myInterval = setInterval(() => {
            const { seconds, minutes, bName } = this.state;
            this.setState(({ bName }) => ({
                bName: 'Stop Timer!'
            }));
            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }));
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(this.myInterval);
                } else {
                    this.setState(({ minutes }) => ({
                        minutes: minutes - 1,
                        seconds: 59
                    }));
                }
            }
        }, 1000);
    }

    timerStop = () => {
        const { bName } = this.state;
        const { players } = this.state;
        this.setState(({ bName }) => ({
            minutes: 2,
            seconds: 0,
            bName: 'Start Timer!'
        }));
        clearInterval(this.myInterval);
        this.nextHighestInit();
    }

    isTimerRunning = () => {
        if (this.state.bName == 'Stop Timer!') {
            this.timerStop();
        } else {
            this.timerStart();
        }
    }

    render() {
        return <Provider
            value={{
                ...this.state,
                timerStart: this.timerStart,
                timerStop: this.timerStop,
                isTimerRunning: this.isTimerRunning,
                nextHighestInit: this.nextHighestInit
            }}
        >{this.props.children}</Provider>;
    }
}

export { TimerContext, TimerProvider, Consumer as TimerConsumer };
