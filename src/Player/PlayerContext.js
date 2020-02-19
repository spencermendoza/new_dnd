import React, { Component } from 'react';
import { Player } from './player';
import {
    FAKE_PLAYERS,
    updatePlayer,
    generateId,
    togglePlayerActive,
    oldTogglePlayerActive,
    sortPlayersBy
} from './playerHelpers';

const PlayerContext = React.createContext();
const { Provider, Consumer } = PlayerContext;

class PlayerProvider extends Component {

    handleTogglePlayerActive = player => {
        this.setState({
            players: oldTogglePlayerActive(this.state.players, player)
        });
    }

    handleAddClick = () => {
        const player = Player.create();
        this.setState({ dialog: { player: player, open: true } });
    }

    handleEditClick = player => {
        this.setState({ dialog: { player, open: true } });
    }

    handleDialogCancelClick = () => {
        this.setState({ dialog: { player: Player.create(), open: false } });
    }

    handleDialogConfirmClick = player => {
        const updatedPlayers = (player.id)
            ? updatePlayer(this.state.players, player)
            : [...this.state.players, { ...player, id: generateId() }];
        this.setState({
            players: updatedPlayers,
            dialog: { player: Player.create(), open: false },
        });
    }

    handleUpdateSortOptions = item => {
        const newSort = item;
        this.setState({ sortBy: newSort });
    }

    handleSetNoneActive = (list) => {
        return list.map(p => {
            if (p.active-- - true) {
                return togglePlayerActive(p);
            } else {
                return p
            }
        })
    }

    nextHighestInit = () => {
        const activeList = sortPlayersBy(this.state.players, 'initiative')
        const workingNumber = this.state.activeNumber;
        const prevNumber = workingNumber - 1;

        if (this.state.activeNumber === 0 && activeList[activeList.length - 1].active === false) {
            this.handleDialogConfirmClick(togglePlayerActive(activeList[workingNumber]))
            console.log('condition 1')
        } else if (this.state.activeNumber === 0 && activeList[activeList.length - 1].active === true) {
            this.handleDialogConfirmClick(togglePlayerActive(activeList[workingNumber]))
            this.handleDialogConfirmClick(togglePlayerActive(activeList[activeList.length - 1]))
            console.log('condition 2')
        } else {
            this.handleDialogConfirmClick(togglePlayerActive(activeList[prevNumber]));
            this.handleDialogConfirmClick(togglePlayerActive(activeList[workingNumber]))
            console.log('condition 3')
        }


        if (workingNumber > (activeList.length - 1)) {
            this.setState({ activeNumber: 0 });
        } else {
            this.setState({ activeNumber: workingNumber + 1 });
        }

    }

    timerStart = () => {
        this.nextHighestInit()
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
    }

    isTimerRunning = () => {
        if (this.state.bName == 'Stop Timer!') {
            this.timerStop();
        } else {
            this.timerStart();
        }
    }


    state = {
        sortBy: 'initiative',
        players: FAKE_PLAYERS,
        minutes: 2,
        seconds: 0,
        bName: 'Start Timer!',
        activeNumber: 0,
        sortOptions: [
            {
                displayText: 'Initiative Value',
                sortBy: 'initiative'
            },
            {
                displayText: 'HP',
                sortBy: 'hp'
            },
            {
                displayText: 'Armor Class',
                sortBy: 'armor'
            },
            {
                displayText: 'Damage',
                sortBy: 'damage'
            }
        ],
        dialog: {
            open: false,
            player: Player.create()
        },
    }


    render() {
        return (
            <Provider
                value={{
                    ...this.state,
                    handleTogglePlayerActive: this.handleTogglePlayerActive,
                    handleAddClick: this.handleAddClick,
                    handleEditClick: this.handleEditClick,
                    handleDialogCancelClick: this.handleDialogCancelClick,
                    handleDialogConfirmClick: this.handleDialogConfirmClick,
                    handleUpdateSortOptions: this.handleUpdateSortOptions,
                    timerStart: this.timerStart,
                    timerStop: this.timerStop,
                    isTimerRunning: this.isTimerRunning,
                }}
            >{this.props.children}</Provider>
        )
    }
}

export { PlayerContext, PlayerProvider, Consumer as PlayerConsumer };