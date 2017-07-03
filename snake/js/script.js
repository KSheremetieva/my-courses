"use strict";

(function(){
function Snake(config){
	this.width = config.width;
	this.height = config.height;
	this.arr = config.arr;
	this.cells = config.cells;
	this.main = document.querySelector('.main');
};

Snake.prototype = {
	constructor: Snake,
	createArr: function(){
		for(let i = 0; i < this.width; i++){
			this.arr[i] = [];
			let row = this.arr[i];
			for(let j = 0; j < this.height; j++){
				this.arr[i][j] = 0;
			}
		}
		return this.arr;
	},
	drawArr: function(){
		for(let i = 0; i < this.arr.length; i++){
			let row = this.arr[i];
			let inRow = document.createElement('div');
			// inRow.style.height = '13px';
			for(let j = 0; j < row.length; j++){
				// console.log(this.main);
				let div = document.createElement('div');
				div.className = 'cell';
				if(this.arr[i][j] == 0){
					div.style.backgroundColor = 'white';
				}else if(this.arr[i][j] == 1){
					div.style.backgroundColor = '#0700C5';
				}else{
					div.style.backgroundColor = '#FF0000';
				}
				// inRow.appendChild(div);
				this.main.appendChild(div)
			}
			// this.main.appendChild(div)
		}
	}
};
 
const config = {
	width: 50,
	height: 50,
	arr: [],
	cells: [],
	main: document.querySelector('.main')
};

document.addEventListener("DOMContentLoaded", ready);
function ready(){
	let button = document.getElementById('button');
	console.log(button);
	button.addEventListener('click', start);
};

// var button = document.querySelector('.button'); // почему не работает??

// var but = document.getElementById('button'); //не работает

function start(){
	let button = document.getElementById('button');
	console.log(button);
	button.style.display = 'none';
	let main = document.querySelector('main');
	main.style.display ="block";
	var snake = new Snake(config);
	snake.createArr();
	snake.drawArr();
}
}());
