/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
var calcDist = exports.calcDist = function calcDist(self, other) {
  return Math.sqrt((self.x - other.x) ** 2 + (self.y - other.y) ** 2);
};

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _util = __webpack_require__(0);

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var Shape = window.createjs.Shape;
var EventDispatcher = window.createjs.EventDispatcher;

var Entity = function (_Shape) {
  _inherits(Entity, _Shape);

  function Entity() {
    var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    _classCallCheck(this, Entity);

    var _this = _possibleConstructorReturn(this, (Entity.__proto__ || Object.getPrototypeOf(Entity)).call(this));

    _this.team = options["team"] || 100;
    _this.maxHealth = options["maxHealth"] || 100;
    _this.currentHealth = options["currentHealth"] || _this.maxHealth;
    _this.size = options["size"] || 10;
    _this.maxSpeed = options["maxSpeed"] || 5;
    // this.currentSpeed = 0
    // this.maxAcceleration = 5
    // this.acceleration = 0
    _this.colorRed = _this.currentHealth > 0 ? Math.floor(255 * (1 - _this.currentHealth / _this.maxHealth)) : 0;
    _this.colorGreen = _this.currentHealth > 0 ? Math.floor(255 * (_this.currentHealth / _this.maxHealth)) : 255;
    _this.color = "rgba(" + _this.colorRed + "," + _this.colorGreen + ",122,1)";
    _this.damage = options["damage"] || 10;
    _this.range = options["range"] || 1;

    _this.graphics.beginFill(_this.color).drawCircle(0, 0, _this.size);
    _this.x = options["x"] || 100;
    _this.y = options["y"] || 100;
    _this.range = 40;
    _this.target = null;
    _this.maxCooldown = 10;
    _this.cooldown = _this.maxCooldown;

    // this.handleMouseOver = this.handleMouseOver.bind(this);
    // this.dealDamage = this.dealDamage.bind(this);
    // this.takeDamage = this.takeDamage.bind(this);
    // this.isDead = this.isDead.bind(this);
    // this.die = this.die.bind(this);
    // this.updateColor = this.updateColor.bind(this);
    return _this;
  }

  _createClass(Entity, [{
    key: "handleMouseOver",
    value: function handleMouseOver() {
      this.takeDamage(5);
      console.log(this.currentHealth);
    }
  }, {
    key: "dealDamage",
    value: function dealDamage(target) {

      target.takeDamage(this.damage);
    }
  }, {
    key: "update",
    value: function update(enemies) {
      self = this;
      if (self.target === null) {
        enemies.forEach(function (enemy) {
          if ((0, _util.calcDist)(self, enemy) < self.size + self.range) {
            self.target = enemy;
          }
        });
      } else if (self.target.parent) {
        if ((0, _util.calcDist)(self, self.target) > self.size + self.range) {
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
  }, {
    key: "takeDamage",
    value: function takeDamage(amt) {
      this.currentHealth -= amt;
      if (this.isDead()) {
        this.die();
      };
      this.updateColor();
    }
  }, {
    key: "isDead",
    value: function isDead() {
      if (this.x > -20 || this.x < 420 || this.y > -20 || this.y < 420) {
        return this.currentHealth <= 0;
      }
      return true;
    }
  }, {
    key: "die",
    value: function die() {
      if (this.parent) {
        this.parent.removeChild(this);
      }
    }
  }, {
    key: "updateColor",
    value: function updateColor() {
      this.colorRed = this.currentHealth > 0 ? Math.floor(255 * (1 - this.currentHealth / this.maxHealth)) : 0;
      this.colorGreen = this.currentHealth > 0 ? Math.floor(255 * (this.currentHealth / this.maxHealth)) : 255;
      this.color = "rgba(" + this.colorRed + "," + this.colorGreen + ",0,1)";
      this.graphics.clear().beginFill(this.color).drawCircle(0, 0, this.size).endFill();
    }
  }]);

  return Entity;
}(Shape);

exports.default = Entity;

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.enemies = exports.towers = undefined;

var _entity = __webpack_require__(1);

var _entity2 = _interopRequireDefault(_entity);

var _util = __webpack_require__(0);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var towers = exports.towers = [];
var enemies = exports.enemies = [];
var stage = void 0;
var canvas = void 0;
var width = void 0;
var height = void 0;

var init = function init() {
  canvas = document.getElementById('demoCanvas');
  width = canvas.width;
  height = canvas.height;
  canvas.style.backgroundColor = "#eeefff";
  stage = new createjs.Stage(canvas);
  stage.mouseEventsEnabled = true;
  stage.enableMouseOver();

  stage.on("stagemousedown", function (e) {
    stage.on("stagemouseup", function (up) {
      if (e.stageX == up.stageX && e.stageY == up.stageY) {
        addTower(e);
      }
    });
  });
  stage.on("mouseover", function (e) {
    return e.target.handleMouseOver();
  });
  stage.on("pressmove", function (e) {
    e.target.x = e.stageX;
    e.target.y = e.stageY;
  });
  stage.on("mouseup", function (e) {
    return e.target.handleMouseUp();
  });
  setInterval(function (e) {
    return addEnemy(stage);
  }, 800);
  createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", tick);
};

function tick(event) {
  var temp = towers;
  temp.forEach(function (tower, idx) {
    if (tower.isDead()) {
      towers.splice(idx, 1);
    } else {
      tower.update(enemies);
    }
  });
  temp = enemies;
  temp.forEach(function (enemy, idx) {
    if (enemy.isDead()) {
      enemies.splice(idx, 1);
    } else {
      var origin = { x: width / 2, y: height / 2 };
      var distFromOrigin = (0, _util.calcDist)(enemy, origin);
      if (distFromOrigin > 0) {
        // debugger
        enemy.x += event.delta / 50 * Math.random() * ((origin.x - enemy.x) / distFromOrigin) * enemy.maxSpeed;
        enemy.y += event.delta / 50 * Math.random() * ((origin.y - enemy.y) / distFromOrigin) * enemy.maxSpeed;
      }
      // Math.random() > 0.5 ?
      // enemy.x += event.delta / 50 * Math.floor(Math.random() * enemy.maxSpeed) :
      // enemy.x -= event.delta / 50 * Math.floor(Math.random() * enemy.maxSpeed);
      // Math.random() > 0.5 ?
      // enemy.y += event.delta / 50 * Math.floor(Math.random() * enemy.maxSpeed) :
      // enemy.y -= event.delta / 50 * Math.floor(Math.random() * enemy.maxSpeed);
    }
  });
  console.log(towers.length + enemies.length);
  stage.update(event);
}

document.addEventListener("DOMContentLoaded", function () {
  return init();
});

var Game = function Game() {
  _classCallCheck(this, Game);
};

var addTower = function addTower(e) {
  var tower = new _entity2.default({
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

var addEnemy = function addEnemy(stage) {
  // const enemy = new Enemy();
  var enemy = new _entity2.default({
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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map