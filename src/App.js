import React, { useContext } from "react";
import { PlayerSortMenu } from './Menu/PlayerSortMenu';
import PlayerFormDialog from './Player/PlayerFormDialog';
import PlayerCardList from './Player/PlayerCardList';
import { PlayerContext } from './Player/PlayerContext';
import Button from '@material-ui/core/Button';

function App() {
    const { handleAddClick } = useContext(PlayerContext)
    return (
        <>
            <PlayerFormDialog />
            <PlayerCardList />
            <Button onClick={handleAddClick}>Add new Player</Button>
        </>
    );
}

export default App;
