import React, { useContext } from 'react';
import PlayerCard from './PlayerCard';
import { sortPlayersBy } from './playerHelpers';
import { PlayerContext } from './PlayerContext';
import Box from '@material-ui/core/Box';

export const PlayerCardList = () => {
    const {
        players,
        sortBy,
    } = useContext(PlayerContext)

    return (
        <Box display="flex" flexDirection="column" justifyContent="center">
            {sortPlayersBy(players, sortBy).map(player => (
                <PlayerCard
                    player={player}
                    key={player.id}
                />
            ))}
        </Box>
    )
}

export default PlayerCardList;