import {calcDist} from './util';

const Shape = window.createjs.Shape;
const EventDispatcher = window.createjs.EventDispatcher;

class Entity extends Shape {
  constructor(options = {}) {
    super();

    this.team = options["team"] || 100;
    this.maxHealth = options["maxHealth"] || 100;
    this.currentHealth = options["currentHealth"] || this.maxHealth
    this.size = options["size"] || 10
    this.maxSpeed = options["maxSpeed"] || 5
    // this.currentSpeed = 0
    // this.maxAcceleration = 5
    // this.acceleration = 0
    this.colorRed = this.currentHealth > 0 ?
      Math.floor(255 * (1-(this.currentHealth/this.maxHealth))) :
      0;
    this.colorGreen = this.currentHealth > 0 ?
      Math.floor(255 * (this.currentHealth/this.maxHealth)) :
      255;
    this.color = `rgba(${this.colorRed},${this.colorGreen},122,1)`;
    this.damage = options["damage"] || 10;
    this.range = options["range"] || 1;

    this.graphics.beginFill(this.color)
      .drawCircle(0, 0, this.size);
    this.x = options["x"] || 100;
    this.y = options["y"] || 100;
    this.range = 40;
    this.target = null;
    this.maxCooldown = 10
    this.cooldown = this.maxCooldown;

    // this.handleMouseOver = this.handleMouseOver.bind(this);
    // this.dealDamage = this.dealDamage.bind(this);
    // this.takeDamage = this.takeDamage.bind(this);
    // this.isDead = this.isDead.bind(this);
    // this.die = this.die.bind(this);
    // this.updateColor = this.updateColor.bind(this);
  }


  handleMouseOver() {
    this.takeDamage(5);
    console.log(this.currentHealth);
  }

  dealDamage(target) {

    target.takeDamage(this.damage)
  }

  update(enemies) {
    self = this;
    if (self.target === null) {
      enemies.forEach(enemy => {
        if (calcDist(self, enemy) < (self.size + self.range)) {
          self.target = enemy;
        }
      });
    } else if (self.target.parent) {
      if (calcDist(self, self.target) > (self.size + self.range)){
        self.target = null;
      } else if (self.cooldown < 0) {
        self.dealDamage(self.target);
        self.cooldown = this.maxCooldown;
      } else {
        self.cooldown -= 1;
      }
    } else {
      self.target = null;
    }
  }

  takeDamage(amt) {
    this.currentHealth -= amt;
    if (this.isDead()) {
      this.die()
    };
    this.updateColor();
  }

  isDead() {
    if ((this.x > -20 || this.x < 420) || (this.y > -20 || this.y < 420)) {
      return this.currentHealth <= 0;
    }
    return true;
  }

  die() {
    if (this.parent) {
      this.parent.removeChild(this);
    }
  }

  updateColor() {
    this.colorRed = this.currentHealth > 0 ?
      Math.floor(255 * (1-(this.currentHealth/this.maxHealth))) :
      0;
    this.colorGreen = this.currentHealth > 0 ?
      Math.floor(255 * (this.currentHealth/this.maxHealth)) :
      255;
    this.color = `rgba(${this.colorRed},${this.colorGreen},0,1)`;
    this.graphics.clear()
      .beginFill(this.color)
      .drawCircle(0, 0, this.size)
      .endFill();
  }
}

export default Entity;
