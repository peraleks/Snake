function Snake(matrix, row, col, direction)
{
	var that = this;
	that.matrix = matrix;
	that.body = [[row, col]];
	that.direction = direction;
	that.eated = false;
	var last_direction = that.direction;
	that.tail = false;
	this.angle = 0;


	this.create = function()
	{
		that.matrix.setCell(row, col, 'head');
	}

	this.move = function()
	{
		function growth()
		{
			that.body.unshift([row, col]);
			that.matrix.setCell(row, col, 'head');
			that.matrix.setCell(row_last, col_last, 'snake_body');
		}

		function test()
		{
			return that.matrix.getCell(row, col);
		}

		var row_last = row;
		var col_last = col;

		switch(that.direction)
		{
			case 'left':
				col--;
				that.matrix.angle = 180;
				that.matrix.scale = 'scaleY(-1)';
			if (col < 1){ col = 20;}
				break;
			case 'up':
				row--;
				that.matrix.angle = 270;
				that.matrix.scale = '';
			if (row < 1){ row = 20;}
				break;
			case 'right':
				col++;
				that.matrix.angle = 0;
				that.matrix.scale = '';
			if (col > 20){ col = 1;}
				break;
			case 'down':
				row++;
				that.matrix.angle = 90;
				that.matrix.scale = '';
			if (row > 20){ row = 1;}
				break;
		}
		
		if (that.body[1])
		{
			if (row == that.body[1][0] && col == that.body[1][1])
			{
				row = row_last;
				col = col_last;
				that.direction = last_direction;
				that.move();
				return;
			}
		}
		last_direction = that.direction;

		if (test() == 'snake_body')
		{
			that.tail = true;
			for (var a = that.body.length - 1; a > 0; a--)
			{
				var dead = that.body[a];

				if (dead[0] == row && dead[1] == col)
				{
					growth();
					that.body.pop();
					return;
				}
				else
				{
					that.matrix.setCell(dead[0], dead[1], 'red');
						that.body.pop();
				}
			}
		}
		if (test() != 'cell')
		{
			that.eated = test();
			if(that.eated != 'bank')
			{
				growth();
				return;
			}
		}

		growth();

		var t = that.body.pop();
		that.matrix.setCell(t[0], t[1], 'cell');
	}
}