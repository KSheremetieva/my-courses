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
	this._moveSnake(this.direction, this.snake);
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
				// console.log(div);
			}
		}
		// let d = document.getElementById(this._generateId(0, 0));
		// d.className += " greenBox";
	},
	_generateId: function(i, j){
		return "x" + i + "y" + j;
	},
	_moveSnake: function(direction, snakePos){
		let _this = this;
		let snakeX = snakePos.x;
		let snakeY = snakePos.y;
		let d = document.getElementById(this._generateId(snakeX, snakeY));
		let timer = setInterval(function(){
			// d.className += " greenBox";

			if(direction == 'down'){
				// if(snakeY == 0){
				// 	d.className = d.className.replace(' greenBox', ' whiteBox');	
				// }
				// d.className = d.className.replace(' greenBox', ' whiteBox');

				let w = document.getElementById(_this._generateId(snakeX, snakeY));
				w.className += ' whiteBox';
				w.className = w.className.replace(' greenBox', ' whiteBox');

				snakeY++;
				let s = document.getElementById(_this._generateId(snakeX, snakeY));
				s.className += " greenBox";
				console.log(s)
			}
			console.log(d)
		}, 1000)

		// switch (this.direction){
		// 	case 'down': 

		// }
	}
};
 
const config = {
	width: 50,
	height: 50,
	arr: [],
	cells: [],
	main: document.querySelector('.main'),
	length: 1,
	snake: {x:0, y:0},
	direction: 'down'
};



function SnakeGame(arg1, arg2){
	MainField.prototype.constructor.bind(this, arguments);
	this.name = arg1;
};

SnakeGame.prototype = Object.create(MainField.prototype);
SnakeGame.prototype.check = function(){
	console.log(this.snake);
}



document.addEventListener("DOMContentLoaded", ready);
function ready(){
	let button = document.getElementById('button');
	// console.log(button);
	button.addEventListener('click', start);
};

function start(){
	let button = document.getElementById('button');
	// console.log(button);
	button.style.display = 'none';
	let main = document.querySelector('main');
	main.style.display ="block";
	var mainField = new MainField(config);
	// mainField._drawArr();
	// var snakeGame = new SnakeGame('snake');
	// snakeGame.check();
	// snakeGame._drawArr();
	// document.addEventListener('keydown', (e)=>{
		// mainField._moveSnake(e);
		// snakeGame._moveSnake(e)
	// });
};

}());
