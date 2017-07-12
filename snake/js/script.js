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
	this._createArr();
	this._drawMap();
	this._drawSnake(this.snake);
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
			}
		}
	},
	_drawSnake: function(arg){
		let s = arg;
		console.log(s)
		for(let i = 0; i < s.length; i++){
			let a = this._containsCl(s[i].x, s[i].y);
			if(!a){

				console.log('tut')
				this._toggleGreen(s[i].x, s[i].y);
			}
		}
	},
	_generateId: function(i, j){
		return "x" + i + "y" + j;
	},
	_toggleGreen: function(x, y){
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
};

SnakeGame.prototype = Object.create(MainField.prototype);
SnakeGame.prototype._snakeDirection = function(e){
	switch (e.keyCode){
		case (38):
			this.direction = 'up';
			break;
		case (40):
			this.direction = 'down';
			break;
		case (39):
			this.direction = 'right';
			break;
		case (37):
			this.direction = 'left';
			break;
	};
};
SnakeGame.prototype._moveSnake = function(){
	let _this = this;
	setInterval(function(){
		let snakeLeng = _this.snake.length-1;
		let snakeX = _this.snake[snakeLeng].x;
		let snakeY = _this.snake[snakeLeng].y;

		switch (_this.direction){
			case ('up'):
				// Добавляем новый элемент с движением вверх
				--snakeY;
				_this.snake.push({x: snakeX, y: snakeY});
				// Убираем цвет у удаленного элемента массива snake
				let up = _this.snake.shift();
				_this._toggleGreen(up.x, up.y );
				// Отрисовка массива с новыми координатами змейки
				_this._drawSnake(_this.snake);
				break;

			case ('down'):
				++snakeY;
				_this.snake.push({x: snakeX, y: snakeY});
				let down = _this.snake.shift();
				_this._toggleGreen(down.x, down.y);
				_this._drawSnake(_this.snake);
				break;

			case ('left'):
				--snakeX;
				_this.snake.push({x: snakeX, y: snakeY});
				let left = _this.snake.shift();
				_this._toggleGreen(left.x, left.y);
				_this._drawSnake(_this.snake);
				break;

			case ('right'):
				++snakeX;
				_this.snake.push({x: snakeX, y: snakeY});
				let right = _this.snake.shift();
				_this._toggleGreen(right.x, right.y);
				_this._drawSnake(_this.snake);

		}
	},1000);
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
	snakeGame._moveSnake();
	//direction
	document.addEventListener('keydown', direction);
};

function direction(e){
	snakeGame._snakeDirection(e);
}

}());