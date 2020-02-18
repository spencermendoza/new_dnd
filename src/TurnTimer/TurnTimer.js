import React, { useContext } from 'react';
import { PlayerContext } from '../Player/PlayerContext';
import Button from '@material-ui/core/Button';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';

export const TurnTimer = () => {
    const {
        isTimerRunning,
        minutes,
        seconds,
        bName
    } = useContext(PlayerContext);

    const useStyles = makeStyles({
        startStyles: {
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column'
        },
        timerDisplay: {
            display: 'flex',
            justifyContent: 'center',
            fontSize: '2em'
        },
    })

    const classes = useStyles();

    return (
        <Box className={classes.startStyles}>
            <Button className={classes.startStyles} onClick={() => isTimerRunning(bName)}>{bName}</Button>
            <Box className={classes.timerDisplay}>
                Time Remaining: {minutes}:{seconds < 10 ? `0${seconds}` : seconds}
            </Box>
        </Box>




    );
};

export default TurnTimer;
