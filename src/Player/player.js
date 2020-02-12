/**
 * @class Player
 */
export class Player {
    /**
     *
     * @param {{name: string; hp: number; damage: number; initiative: number; armor: number; id: number;}} playerAttributes - An object with properties that will be set on the returned Player.
     */
    constructor({
        name = '',
        hp = 0,
        damage = 0,
        initiative = 0,
        armor = 0,
        id = 0
    }) {
        this.name = name;
        this.id = id;
        this.hp = hp;
        this.armor = armor;
        this.damage = damage;
        this.initiative = initiative;
    }

    /**
     * # create
     * A convenience method for creating Player instances.
     * @param {{name: string; hp: number; damage: number; initiative: number; armor: number; id: number;}} playerObj
     */
    static create(playerObj = {}) {
        // This method exists so that we can be sure every
        // Player instance is created the same way.
        // If you need to create a Player instance without the `new` keyword, just instantiate
        // one manually.
        return new Player(playerObj);
    }
}
