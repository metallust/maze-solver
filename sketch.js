var grid = [];
var cols, rows;
var w = 40;
var player;
var stack = [];
var next;

function setup() {
    createCanvas(600, 600);
    background(51);
    cols = floor(width / w);
    rows = floor(height / w);
    for (var j = 0; j < rows; j++) {
        for (var i = 0; i < cols; i++) {
            var cell = new Cell(i, j);
            grid.push(cell);
        }
    }
    mazegenerator();
    player = nextMove(grid[0]);

    for (var i = 0; i < grid.length; i++) grid[i].show();

    noStroke();
    fill(255, 0, 0);
    rect(grid[0].i * w, grid[0].j * w, w - 5, w - 5);
    rect(
        grid[grid.length - 1].i * w,
        grid[grid.length - 1].j * w,
        w - 2,
        w - 2
    );
}

function draw() {
    if (player == grid[grid.length - 1]) {
        displayPath();
        for (let i = 0; i < shortestPath.length; i++) {
            noStroke();
            fill(0, 200, 255, 50);
            rect(shortestPath[i].i * w, shortestPath[i].j * w, w - 5, w - 5);
        }
        noStroke();
    } else play();
    frameRate(10);
}

function play() {
    fill(0, 0, 255);
    rect(player.i * w, player.j * w, w - 5, w - 5);
    player = nextMove(player);
}

function CheckOption(block) {
    var neighbours = [];

    var top = grid[index(block.i, block.j - 1)];
    var right = grid[index(block.i + 1, block.j)];
    var bottom = grid[index(block.i, block.j + 1)];
    var left = grid[index(block.i - 1, block.j)];

    if (top && !block.walls[0]) neighbours.push(top);
    if (right && !block.walls[1]) neighbours.push(right);
    if (bottom && !block.walls[2]) neighbours.push(bottom);
    if (left && !block.walls[3]) neighbours.push(left);

    return neighbours;
}

function mazegenerator() {
    var current = grid[0];
    while (true) {
        current.visited = true;
        //step 1
        var next = current.checkNeighbour();
        if (next) {
            //step 2
            stack.push(current);
            //step 3
            removeWalls(current, next);
            //step 4
            current = next;
        } else if (stack.length > 0) {
            current = stack.pop();
        } else {
            return;
        }
    }
}

function index(i, j) {
    if (i < 0 || j < 0 || i > cols - 1 || j > rows - 1) {
        return -1;
    } else {
        return i + j * cols;
    }
}

function Cell(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    //top,right,bottom,left--
    this.visited = false;

    this.show = function () {
        var x = this.i * w;
        var y = this.j * w;
        stroke(255);
        strokeWeight(7);
        if (this.walls[0]) line(x, y, x + w, y);
        if (this.walls[1]) line(x + w, y, x + w, y + w);
        if (this.walls[2]) line(x + w, y + w, x, y + w);
        if (this.walls[3]) line(x, y + w, x, y);

        if (this.visited) {
            noStroke();
            fill(100, 100, 100, 255);
            rect(x, y, w, w);
        }
    };

    this.checkNeighbour = function () {
        var neighbours = [];

        var top = grid[index(this.i, this.j - 1)];
        var right = grid[index(this.i + 1, this.j)];
        var bottom = grid[index(this.i, this.j + 1)];
        var left = grid[index(this.i - 1, this.j)];

        if (top && !top.visited) neighbours.push(top);
        if (right && !right.visited) neighbours.push(right);
        if (bottom && !bottom.visited) neighbours.push(bottom);
        if (left && !left.visited) neighbours.push(left);

        if (neighbours.length > 0) {
            var r = floor(random(0, neighbours.length));
            return neighbours[r];
        } else {
            return undefined;
        }
    };
}

function removeWalls(a, b) {
    var x = a.i - b.i;
    if (x === 1) {
        a.walls[3] = false;
        b.walls[1] = false;
    } else if (x === -1) {
        a.walls[1] = false;
        b.walls[3] = false;
    }
    var y = a.j - b.j;
    if (y === 1) {
        a.walls[0] = false;
        b.walls[2] = false;
    } else if (y === -1) {
        a.walls[2] = false;
        b.walls[0] = false;
    }
}
