import React, { useContext } from 'react';
import { PlayerContext } from '../Player/PlayerContext';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Box from '@material-ui/core/Box';

export const PopOutMenu = () => {
    const {
        handleUpdateSortOptions,
        sortOptions
    } = useContext(PlayerContext)

    const useStyles = makeStyles({
        Box: {
            display: 'flex',
            justifyContent: 'center'
        }
    })

    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = e => {
        setAnchorEl(e.currentTarget);
    }

    const handleClose = (thing) => {
        handleUpdateSortOptions(thing);
        setAnchorEl(null);
    }

    const classes = useStyles();

    return (
        <Box className={classes.Box}>
            <Button onClick={handleClick}>
                Show Player Sort Options
            </Button>
            <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
                className={classes.Box}>
                {sortOptions.map(item => (
                    <MenuItem onClick={() => handleClose(item.sortBy)} key={item.displayText}>
                        Sort By {item.displayText}
                    </MenuItem>
                ))}
            </Menu>
        </Box >
    );
}

export default PopOutMenu;

