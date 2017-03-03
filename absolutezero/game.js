import Entity from './entity';
import Enemy from './entity';
import {calcDist} from './util';

export let towers = [];
export let enemies = [];
let stage;
let canvas;
let width;
let height;

const init = () => {
  canvas = document.getElementById('demoCanvas')
  width = canvas.width;
  height = canvas.height;
  canvas.style.backgroundColor = "#eeefff";
  stage = new createjs.Stage(canvas);
  stage.mouseEventsEnabled = true;
  stage.enableMouseOver()

  stage.on("stagemousedown", (e) => {
    stage.on("stagemouseup", (up) => {
      if (e.stageX == up.stageX && e.stageY == up.stageY) {
        addTower(e);
      }
    })
  });
  stage.on("mouseover", e => e.target.handleMouseOver());
  stage.on("pressmove", e => {
    e.target.x = e.stageX;
    e.target.y = e.stageY;
  });
  stage.on("mouseup", e => e.target.handleMouseUp());
  setInterval((e) => addEnemy(stage), 800);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", tick);

};

function tick(event) {
  let temp = towers
  temp.forEach((tower,idx) => {
    if (tower.isDead()) {
      towers.splice(idx, 1);
    } else {
      tower.update(enemies);
    }
  })
  temp = enemies
  temp.forEach((enemy, idx) => {
    if (enemy.isDead()) {
      enemies.splice(idx, 1);
    } else {
      const origin = {x: width/2, y: height/2}
      let distFromOrigin = calcDist(enemy, origin);
      if (distFromOrigin > 0) {
        // debugger
        enemy.x += event.delta / 50 * Math.random() * ((origin.x - enemy.x )/ distFromOrigin) * enemy.maxSpeed
        enemy.y += event.delta / 50 * Math.random() * ((origin.y - enemy.y) / distFromOrigin) * enemy.maxSpeed
      }
      // Math.random() > 0.5 ?
      // enemy.x += event.delta / 50 * Math.floor(Math.random() * enemy.maxSpeed) :
      // enemy.x -= event.delta / 50 * Math.floor(Math.random() * enemy.maxSpeed);
      // Math.random() > 0.5 ?
      // enemy.y += event.delta / 50 * Math.floor(Math.random() * enemy.maxSpeed) :
      // enemy.y -= event.delta / 50 * Math.floor(Math.random() * enemy.maxSpeed);
    }
  })
  console.log(towers.length + enemies.length);
  stage.update(event);
}

document.addEventListener("DOMContentLoaded", ()=> init());

class Game {

}

const addTower = (e) => {
  const tower = new Entity({
    x: e.stageX,
    y: e.stageY,
    maxHealth: 50,
    size: 20,
    team: 2,
    maxSpeed: 0,
    damage: 3
  });
  towers.push(tower);
  e.target.addChild(tower);
};

const addEnemy = stage => {
  // const enemy = new Enemy();
  const enemy = new Entity({
    x: Math.floor(width * Math.random()),
    y: Math.floor(height * Math.random()),
    maxHealth: 25,
    size: 10,
    team: 1,
    maxSpeed: 5
  });
  enemies.push(enemy);
  stage.addChild(enemy);
};
