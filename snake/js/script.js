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
	this._createArr();
	this._drawArr();
	this._moveSnake();
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
	_drawArr: function(){
		for(let i = 0; i < this.arr.length; i++){
			for(let j = 0; j < this.arr.length; j++){ // row.length
				let div = document.createElement('div');
				div.className = 'cell whiteBox';
				div.setAttribute('id', this._generateId(j, i));
				this.main.appendChild(div);
			}
		}
	},
	_generateId: function(i, j){
		return "x" + i + "y" + j;
	},
	_moveSnake: function(direction, snakePos){
		let _this = this;
		setInterval(function(){
			let snakeX = _this.snake.x;
			let snakeY = _this.snake.y;
			if(_this.direction == 'down'){
				//Clean before
				let snakeY_bef = _this.snake.y - 1;
				if(snakeY_bef >= 0){
				_this._toggle(snakeX, snakeY_bef);
				};
				_this._toggle(snakeX, snakeY);
				_this.snake.y++;
			};

			if(_this.direction == 'up'){
				//Clean after
				let snakeY_aft = _this.snake.y +1;
				if(snakeY_aft <= 49){
				_this._toggle(snakeX, snakeY_aft);
				};
				_this._toggle(snakeX, snakeY);
				_this.snake.y--;
			};
			
			if(_this.direction == 'right'){
				//Clean before
				let snakeX_bef = _this.snake.x -1;
				if(snakeX_bef >= 0){
					_this._toggle(snakeX_bef, snakeY);
				};
				_this._toggle(snakeX, snakeY);
				_this.snake.x++;
			};
			
			if(_this.direction == 'left'){
				//Clean after
				let snakeX_aft = _this.snake.x +1;
				if(snakeX_aft <= 49){
					_this._toggle(snakeX_aft, snakeY);
				};
				_this._toggle(snakeX, snakeY);
				_this.snake.x--;
			};

		},1000);
	},
	_toggle: function(i, y){
		console.log(i,y)
		let x = document.getElementById(this._generateId(i, y));
		x.classList.toggle('greenBox');
	}
};
 
const config = {
	width: 50,
	height: 50,
	arr: [],
	cells: [],
	main: document.querySelector('.main'),
	length: 1,
	snake: {x:25, y:25},
	apple: {x:15, y:27},
	direction: 'left'
};

function SnakeGame(){
	MainField.prototype.constructor.apply(this, arguments);
};

SnakeGame.prototype = Object.create(MainField.prototype);

document.addEventListener("DOMContentLoaded", ready);
function ready(){
	let button = document.getElementById('button');
	button.addEventListener('click', start);
};

function start(){
	let button = document.getElementById('button');
	button.style.display = 'none';
	let main = document.querySelector('main');
	main.style.display ="block";
	var snakeGame = new SnakeGame(config);
};

}());
