import React, { Component } from 'react';
import { Player } from './player';
import { PlayerContext } from './PlayerContext';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

class PlayerFormDialog extends Component {
    constructor(props) {
        super(props)

        this.playerNameRef = React.createRef();
        this.playerInitiativeRef = React.createRef();
        this.playerHpRef = React.createRef();
        this.playerArmorRef = React.createRef();
        this.playerDamageRef = React.createRef();
        this.playerIdRef = React.createRef();
    }

    static contextType = PlayerContext;

    handleCancelClick = (e, onCancel) => {
        e.preventDefault();
        onCancel();
    };

    handleSubmit = (e, onConfirm) => {
        e.preventDefault();
        const newPlayer = Player.create({
            name: this.playerNameRef.current.value,
            initiative: parseInt(this.playerInitiativeRef.current.value),
            hp: parseInt(this.playerHpRef.current.value),
            armor: parseInt(this.playerArmorRef.current.value),
            damage: parseInt(this.playerDamageRef.current.value),
            id: parseInt(this.playerIdRef.current.value)
        });
        onConfirm(newPlayer);
    }

    render() {
        const {
            dialog,
            handleDialogCancelClick,
            handleDialogConfirmClick,
        } = this.context;
        const { player, open } = dialog;
        return (
            <Dialog open={open}>
                <DialogTitle>Editing: {player.name}</DialogTitle>
                <DialogContent>
                    <TextField
                        type="text"
                        inputRef={this.playerNameRef}
                        label="Name:"
                        defaultValue={player.name} />
                    <TextField
                        type="number"
                        inputRef={this.playerInitiativeRef}
                        label="Initiative:"
                        defaultValue={player.initiative} />
                    <TextField
                        type="number"
                        inputRef={this.playerHpRef}
                        label="HP:"
                        defaultValue={player.hp} />
                    <TextField
                        type="number"
                        inputRef={this.playerArmorRef}
                        label="Armor Class:"
                        defaultValue={player.armor} />
                    <TextField
                        type="number"
                        inputRef={this.playerDamageRef}
                        label="Damage:"
                        defaultValue={player.damage} />
                    <TextField
                        type="number"
                        inputRef={this.playerIdRef}
                        id="id"
                        label="ID:"
                        defaultValue={player.id}
                        InputProps={{ readOnly: true }} />
                    <Button onClick={e => this.handleSubmit(e, handleDialogConfirmClick)}>Confirm</Button>
                    <Button onClick={e => this.handleCancelClick(e, handleDialogCancelClick)}>Cancel</Button>
                </DialogContent>
            </Dialog>
        );
    }
}

export default PlayerFormDialog;