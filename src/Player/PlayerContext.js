import React, { Component } from 'react';
import { Player } from './player';
import {
    FAKE_PLAYERS,
    updatePlayer,
    sortPlayersBy,
    generateId,
    togglePlayerActive
} from './playerHelpers';

const PlayerContext = React.createContext();
const { Provider, Consumer } = PlayerContext;

class PlayerProvider extends Component {

    handleTogglePlayerActive = player => {
        this.setState({
            players: togglePlayerActive(this.state.players, player)
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


    state = {
        sortBy: 'initiative',
        players: FAKE_PLAYERS,
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
        }
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
                    handleUpdateSortOptions: this.handleUpdateSortOptions
                }}
            >{this.props.children}</Provider>
        )
    }
}

export { PlayerContext, PlayerProvider, Consumer as PlayerConsumer };