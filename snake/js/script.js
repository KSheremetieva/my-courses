"use strict";

(function(){
function MainField(config){
	this.width = config.width;
	this.height = config.height;
	this.arr = config.arr;
	this.cells = config.cells;
	this.main = document.querySelector('.main');
	this.length = config.length;
	this.snake = config.snake;
	this.direction = config.direction;
	this.direct = config.direct;
	this.timer;
	this._createArr();
	this._drawMap();
	this._drawSnake(this.snake);
	// this._moveSnake(); //убрать :)  this.direction, this.snake
	// this._toggleGreen();
};

MainField.prototype = {
	constructor: MainField,
	_createArr: function(){
		for(let i = 0; i < this.width; i++){
			this.arr[i] = [];
			let row = this.arr[i];
			for(let j = 0; j < this.height; j++){
				this.arr[i][j] = 0;
			}
		}
		return this.arr;
	},
	_drawMap: function(){
		for(let i = 0; i < this.arr.length; i++){
			for(let j = 0; j < this.arr.length; j++){ // row.length
				let div = document.createElement('div');
				div.className = 'cell'; //whiteBox
				div.setAttribute('id', this._generateId(j, i));
				this.main.appendChild(div);
				// console.log(div);
			}
		}
		// let d = document.getElementById(this._generateId(0, 0));
		// d.className += " greenBox";
	},
	_drawSnake: function(arg){
		// for(let i = 0; i < ){
		let s = arg;
		console.log(s)
		// console.log(this.snake.length);
		for(let i = 0; i < s.length; i++){
			// console.log(this.snake[i].y)
			let a = this._containsCl(s[i].x, s[i].y);
			if(!a){

				console.log('tut')
				this._toggleGreen(s[i].x, s[i].y);
			}
			// else{
			// 	this._toggleGreen(s[i].x, s[i].y);
			// }
		}
	},
	// _moveSnake: function(){
	// 	setInterval(function(){
	// 		let snakeX = _this.snake.x;
	// 		let snakeY = _this.snake.y;
	// 		console.log(snakeX, snakeY);
	// 		if(_this.direction == 'up'){
	// 			console.log('up')
	// 		};
	// 	},1000);
	// },
	_generateId: function(i, j){
		return "x" + i + "y" + j;
	},
	_toggleGreen: function(x, y){
		// console.log(x,y);
		let elem = document.getElementById(this._generateId(x, y));
		elem.classList.toggle('greenBox');
	},
	_toggleWhite: function(x, y){
		let elem = document.getElementById(this._generateId(x, y));
		elem.classList.toggle('whiteBox');
	},
	_containsCl: function(x, y){
		let elem = document.getElementById(this._generateId(x, y));
		return elem.classList.contains('greenBox');
	}
};
//check next step (край карты или яблоко)
 
const config = {
	width: 50,
	height: 50,
	arr: [],
	cells: [],
	main: document.querySelector('.main'),
	length: 1,
	snake: [{x:25, y:27}, {x:25, y:26}, {x:25, y:25}, {x:25, y:24}, {x:25, y:23}], //{x:25, y:26}, {x:25, y:27}
	apple: {x:15, y:27},
	direction: 'up',
	direct: {before: 'left', now: 'right'}
};


function SnakeGame(){
	MainField.prototype.constructor.apply(this, arguments);
	// this.name = arg1;
};

SnakeGame.prototype = Object.create(MainField.prototype);
SnakeGame.prototype._snakeDirection = function(e){
	switch (e.keyCode){
		case (38):
		// console.log('vcx')
			this.direction = 'up';
			break;
		case (40):
		// console.log('vcx')
			this.direction = 'down';
			break;
		case (39):
		// console.log('vcx')
			this.direction = 'right';
			// this.direct.before = this.direct.now;
			// this.direct.now = 'right';
			break;
		case (37):
		// console.log('vcx')
			this.direction = 'left';
			// this.direct.before = this.direct.now;
			// this.direct.now = 'left';
			break;
	};
};
SnakeGame.prototype._moveSnake = function(){
	let _this = this;
	this.timer = setInterval(function(){
		let snakeLeng = _this.snake.length-1;
		let snakeX = _this.snake[snakeLeng].x;
		let snakeY = _this.snake[snakeLeng].y;
		// console.log(snakeX, snakeY);
		// if(_this.direction == 'up'){
		// 	// Добавляем новый элемент с движением вверх
		// 	--snakeY;
		// 	_this.snake.push({x: snakeX, y: snakeY});
		// 	// Убираем цвет у удаленного элемента массива snake
		// 	let q = _this.snake.shift();
		// 	// console.log(q)
		// 	_this._toggleGreen(q.x, q.y );
		// 	// console.log(snakeLeng);
		// 	// console.log(_this.snake.length)

		// 	// Отрисовка массива с новыми координатами змейки
		// 	_this._drawSnake(_this.snake);
		// };
		switch (_this.direction){
			case ('up'):
				// Добавляем новый элемент с движением вверх
				--snakeY;
				_this._checkNextStep(snakeY);
				_this.snake.push({x: snakeX, y: snakeY});
				// Убираем цвет у удаленного элемента массива snake
				let up = _this.snake.shift();
				_this._toggleGreen(up.x, up.y );
				// Отрисовка массива с новыми координатами змейки
				_this._drawSnake(_this.snake);
				break;

			case ('down'):
				++snakeY;
				_this._checkNextStep(snakeY);
				_this.snake.push({x: snakeX, y: snakeY});
				let down = _this.snake.shift();
				_this._toggleGreen(down.x, down.y);
				_this._drawSnake(_this.snake);
				break;

			case ('left'):
				--snakeX;
				_this._checkNextStep(snakeX);
				_this.snake.push({x: snakeX, y: snakeY});
				let left = _this.snake.shift();
				_this._toggleGreen(left.x, left.y);
				_this._drawSnake(_this.snake);
				break;

			case ('right'):
				++snakeX;
				_this._checkNextStep(snakeX);
				_this.snake.push({x: snakeX, y: snakeY});
				let right = _this.snake.shift();
				_this._toggleGreen(right.x, right.y);
				_this._drawSnake(_this.snake);

		}
	},1000);
};
SnakeGame.prototype._checkNextStep = function(coordinate){
	if(coordinate == 0 || coordinate >= 50){
		console.log('Game Over');
		this._stop();
	}
};
SnakeGame.prototype._stop = function(){
	clearInterval(this.timer);
	this.main.style.display = 'none';
	let over = document.querySelector('.over');
	over.style.display = 'inline-block';
};


document.addEventListener("DOMContentLoaded", ready);
function ready(){
	let button = document.getElementById('button');
	button.addEventListener('click', start);
};
var snakeGame;
function start(){
	let button = document.getElementById('button');
	button.style.display = 'none';
	let main = document.querySelector('main');
	main.style.display ="block";
	snakeGame = new SnakeGame(config);
	snakeGame._moveSnake();  //???????? не работает
	//direction
	document.addEventListener('keydown', direction);
};

function direction(e){
	snakeGame._snakeDirection(e);
}

}());