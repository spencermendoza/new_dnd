import React, { useContext } from "react";
import { PlayerSortMenu } from './Menu/PlayerSortMenu';
import PlayerFormDialog from './Player/PlayerFormDialog';
import PlayerCardList from './Player/PlayerCardList';
import { PlayerContext } from './Player/PlayerContext';
import TurnTimer from './TurnTimer/TurnTimer'
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';

function App() {
    const useStyles = makeStyles({
        buttonStyle: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
        }
    })
    const { handleAddClick } = useContext(PlayerContext)

    const classes = useStyles();
    return (
        <>
            <PlayerSortMenu />
            <PlayerFormDialog />
            <PlayerCardList />
            <TurnTimer />
            <Box className={classes.buttonStyle}>
                <Button className={classes.buttonStyle} onClick={handleAddClick}>Add new Player</Button>
            </Box>
        </>
    );
}

export default App;
