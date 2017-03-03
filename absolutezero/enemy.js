import Entity from './entity.js';

class Enemey extends Entity {
  constructor(options) {
    super();

    debugger
    this.x: Math.floor(400 * Math.random());
    this.y: Math.floor(400 * Math.random());
    this.maxHealth: 25;
    this.size: 10;
    this.team: 3;
  }


}

export default Enemey;
