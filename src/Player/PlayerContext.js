import React, { Component } from 'react';
import { Player } from './player';
import {
    FAKE_PLAYERS,
    updatePlayer,
    generateId,
    togglePlayerActive,
    oldTogglePlayerActive,
    sortPlayersBy,
    newUpdatePlayer,
    addToList
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

    //TODO: rewrite this chunk of code to use the new functions in playerHelpers
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
            if (p.active === true) {
                return togglePlayerActive(p);
            } else {
                return p
            }
        })
    }

    nextHighestInit = () => {

        let activeList = sortPlayersBy(this.state.players.map(p => {
            if (p.active == false) {
                return p;
            } else {
                return togglePlayerActive(p)
            }
        }), 'initiative')

        let workingNumber = this.state.activeNumber;

        if (workingNumber < activeList.length) {
            activeList = oldTogglePlayerActive(activeList, activeList[workingNumber])
            workingNumber++;
        } else if (workingNumber === 0) {
            activeList = oldTogglePlayerActive(activeList, activeList[workingNumber])
        }
        else {
            workingNumber = 0;
            activeList = oldTogglePlayerActive(activeList, activeList[workingNumber])
        }

        activeList = sortPlayersBy(activeList, this.state.sortBy);

        this.setState({
            players: activeList,
            activeNumber: workingNumber
        })
    }

    timerStart = () => {
        this.myInterval = setInterval(() => {
            const { seconds, minutes, bName, firstTurn } = this.state;
            this.setState({
                bName: 'Stop Timer!'
            });

            if (firstTurn) {
                this.nextHighestInit();
                this.setState({ firstTurn: false })
            }

            if (seconds > 0) {
                this.setState(({ seconds }) => ({
                    seconds: seconds - 1
                }));
            }
            if (seconds === 0) {
                if (minutes === 0) {
                    this.setState({
                        minutes: 0,
                        seconds: 10
                    })
                    this.nextHighestInit()
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
        this.setState({
            bName: 'Start Timer!'
        })
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
        minutes: 0,
        seconds: 10,
        bName: 'Start Timer!',
        firstTurn: true,
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
                    togglePlayerActive: togglePlayerActive
                }}
            >{this.props.children}</Provider>
        )
    }
}

export { PlayerContext, PlayerProvider, Consumer as PlayerConsumer };