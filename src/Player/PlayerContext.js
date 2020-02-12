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

    state = {
        sortBy: 'initiative',
        players: FAKE_PLAYERS,
        dialog: {
            open: false,
            player: Player.create()
        }
    }

    handleTogglePlayerActive = player => {
        this.setState({
            players: togglePlayerActive(this.state.players, player)
        });
    }

    handleAddClick = () => {
        const player = Player.create();
        player.id = generateId();
        this.setState({ dialog: { player: player, open: true } });
    }

    handleEditClick = player => {
        this.setState({ dialog: { player, open: true } });
    }

    handleDialogCancelClick = () => {
        this.setState({ dialog: { player: Player.create(), open: false } });
    }

    handleDialogConfirmClick = player => {
        const updatedPlayer = player.id
            ? updatePlayer(this.state.players, player)
            : [...this.state.players, { ...player, id: generateId() }];
        this.setState({
            players: updatedPlayer,
            dialog: { player: Player.create(), open: false },
        });
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
                }}
            >{this.props.children}</Provider>
        )
    }
}

export { PlayerContext, PlayerProvider, Consumer as PlayerConsumer };