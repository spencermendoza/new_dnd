import PropTypes from 'prop-types';

//Fake player list for testing purposes
export const FAKE_PLAYERS = [
    {
        name: 'Balazar',
        armor: 20,
        hp: 127,
        initiative: 15,
        damage: 32,
        id: 2,
        active: false
    },
    {
        name: 'Cronan',
        armor: 18,
        hp: 158,
        initiative: 1,
        damage: 52,
        id: 1,
        active: false
    },
    {
        name: 'Marsk',
        armor: 19,
        hp: 114,
        initiative: 7,
        damage: 75,
        id: 3,
        active: false
    },
    {
        name: 'Barri',
        armor: 15,
        hp: 69,
        initiative: 20,
        damage: 12,
        id: 4,
        active: false
    }
];

//function that returns the proptypes of each player. Every player will(should) have these prop types
export function getPlayerPropTypes() {
    return {
        name: PropTypes.string,
        id: PropTypes.number,
        hp: PropTypes.number,
        armor: PropTypes.number,
        damage: PropTypes.number,
        initiative: PropTypes.number,
        active: PropTypes.boolean
    }
}

//updates a given player
export const updatePlayer = (list, player) =>
    list.map(p => ((p.id === player.id) ? player : p));

//sorts an array according to item/prop input
const _sort = prop => (a, b) => {
    if (a[prop] > b[prop]) return -1;
    if (a[prop] === b[prop]) return 0;
    if (a[prop] < b[prop]) return 1;
};

//sorts the list of players by their prop number
export const sortPlayersBy = (list, prop) => {
    return [...list.sort(_sort(prop))];
}

//generates an id to use when creating a new player
export const generateId = () => Math.floor(Math.random() * 100_000);

// toggles the player as an active player
export function oldTogglePlayerActive(list, player) {
    return list.map(p => {
        if (p.id === player.id) {
            return { ...player, active: !player.active };
        } else {
            return p;
        }
    })
    console.log(list)
};

export function togglePlayerActive(p) {
    return { ...p, active: !p.active };
}

export function addToList(list, item) {
    return list.map(p => {
        if (p.id === item.id) {
            return item;
        } else {
            return p;
        }
    })
}

