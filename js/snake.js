APP.namespace('Snake');

APP.Snake = function (matrix, row, col, direction) {

    var self = this;
    this.matrix = matrix;
    this.body = [[row, col]];
    this.direction = direction;
    this.eated = false;
    var last_direction = self.direction;
    this.tail = false;
    this.angle = 0;


    this.create = function () {
        self.matrix.setCell(row, col, 'head');
    };

	this.move = function()
	{
		function growth()
		{
			self.body.unshift([row, col]);
			self.matrix.setCell(row, col, 'head');
			self.matrix.setCell(row_last, col_last, 'snake_body');
		}

		function test()
		{
			return self.matrix.getCell(row, col);
		}

		var row_last = row;
		var col_last = col;

		switch(self.direction)
		{
			case 'left':
				col--;
				self.matrix.angle = 180;
				self.matrix.scale = 'scaleY(-1)';
			if (col < 1){ col = 20;}
				break;
			case 'up':
				row--;
				self.matrix.angle = 270;
				self.matrix.scale = '';
			if (row < 1){ row = 20;}
				break;
			case 'right':
				col++;
				self.matrix.angle = 0;
				self.matrix.scale = '';
			if (col > 20){ col = 1;}
				break;
			case 'down':
				row++;
				self.matrix.angle = 90;
				self.matrix.scale = '';
			if (row > 20){ row = 1;}
				break;
		}
		
		if (self.body[1])
		{
			if (row == self.body[1][0] && col == self.body[1][1])
			{
				row = row_last;
				col = col_last;
				self.direction = last_direction;
				self.move();
				return;
			}
		}
		last_direction = self.direction;

		if (test() == 'snake_body')
		{
			self.tail = true;
			for (var a = self.body.length - 1; a > 0; a--)
			{
				var dead = self.body[a];

				if (dead[0] == row && dead[1] == col)
				{
					growth();
					self.body.pop();
					return;
				}
				else
				{
					self.matrix.setCell(dead[0], dead[1], 'red');
						self.body.pop();
				}
			}
		}
		if (test() != 'cell')
		{
			self.eated = test();
			if(self.eated != 'bank')
			{
				growth();
				return;
			}
		}

		growth();

		var t = self.body.pop();
		self.matrix.setCell(t[0], t[1], 'cell');
	}
};