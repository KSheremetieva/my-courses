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
			inRow.style.height = '13px';
			this.main.style.display = 'inline-block';
			// this.main.style.margin = '0 auto'; //не работает почему-то
			this.main.style.marginLeft = '20%';
			this.main.style.boxShadow = '0px 0px 210px 13px rgba(61,71,80,1)';
			for(let j = 0; j < row.length; j++){
				// console.log(this.main);
				let div = document.createElement('div');
				div.className = 'cell';
				div.style.width = '13px';
				div.style.height = '100%';
				div.style.display = 'inline-block';
				div.style.border = '1px solid rgba(44,44,44,0.1)';
				if(this.arr[i][j] == 0){
					div.style.backgroundColor = 'white';
				}else if(this.arr[i][j] == 1){
					div.style.backgroundColor = '#0700C5';
				}else{
					div.style.backgroundColor = '#FF0000';
				}
				inRow.appendChild(div);
			}
			this.main.appendChild(inRow)
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
	var snake = new Snake(config);
	snake.createArr();
	snake.drawArr();
};
