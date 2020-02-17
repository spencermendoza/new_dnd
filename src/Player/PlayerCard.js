import React, { useContext } from 'react';
import { PlayerContext } from './PlayerContext'
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    card: {
        backgroundColor: '#fefefe',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '.5%',
        minWidth: '50%',
        minHeight: '250px',
    },
    title: {
        fontSize: '2em',
        borderBottom: '4px solid pink',
        overflow: 'hidden',
        margin: '1%',
        padding: '-10%',
    },
    content: {
        display: 'flex',
        justifyContent: 'spaceAround',
        flexDirection: 'column',
        padding: '0px',
        minWidth: '50%',
    },
    items: {
        margin: '2.5%',
        display: 'flex',
        flexDirection: 'column'
    },
    activePlayer: {
        backgroundColor: '#fefefe',
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        marginTop: '.5%',
        minWidth: '50%',
        minHeight: '250px',
        border: '2px solid black',
        borderBottom: '1px solid black',
        borderTop: '1px solid black',
    },
    button: {
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'row',
    }
});

const PlayerCard = ({
    player = {},
}) => {
    const { name, hp, armor, damage, initiative, active } = player;
    const classes = useStyles();
    let isActive = '';
    if (player.active === true) {
        isActive = classes.activePlayer;
    } else {
        isActive = classes.card;
    }

    const {
        handleTogglePlayerActive,
        handleEditClick,
    } = useContext(PlayerContext);

    return (
        <Card className={isActive}>
            <Typography className={classes.title}>{name}:</Typography>
            <CardContent className={classes.content}>
                <Typography className={classes.items}>Init: {initiative}</Typography>
                <Typography className={classes.items}>HP: {hp}</Typography>
                <Typography className={classes.items}>Armor Class: {armor}</Typography>
                <Typography className={classes.items}>Damage: {damage}</Typography>
            </CardContent>

            <CardActions className={classes.button}>
                <>
                    <Button onClick={() => handleTogglePlayerActive(player)}>Click Me!</Button>
                    <Button onClick={() => handleEditClick(player)} >Edit</Button>
                </>
            </CardActions>
        </Card >
    )
}

export default PlayerCard;




