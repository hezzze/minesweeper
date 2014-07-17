var _COLS = 10;
var _ROWS = 10;
var _NUM_OF_BOMBS = 20;
var _minegrid = [];
var _cellGroups = [];
var _minePoses = [];
var _randPosGen = new RandPosGen(_COLS, _ROWS);

function Cell() {
    this.count = 0;
    var on = false;
    var group = null;
    var isBomb = false;
    this.toS = function() {
        if (isBomb) {
            return "*";
        }
        if (this.count === 0) {
            return "_";
        } else {
            return this.count;
        }
    }
    this.setBomb = function() {
        isBomb = true;
    }
}

function randIndex(max) {
    return Math.floor(Math.random() * max);
}

function RandPosGen(rows, cols) {
    var n = [];
    for (var i = 0; i < rows * cols; i++) {
        n.push(i);
    }
    this.nextPos = function() {
        var randI, result, pos = [];
        if (n.length === 0) {
            throw "no more!";
        } else {
            randI = randIndex(n.length);
            result = n[randI];
            n.splice(randI, 1);
        }
        pos[0] = Math.floor(result / rows);
        pos[1] = result % cols;
        return pos;
    }
}

function Group() {
    this.members = [];
}




function inGrid(pos, rows, cols) {
    return pos[0] >= 0 && pos[0] < rows && pos[1] >= 0 && pos[1] < cols;
}

function printMineGrid(grid) {
    var rows = grid.length;
    var cols = grid[0].length;
    var line;
    for (var i = 0; i < rows; i++) {
        var line = "";
        for (var j = 0; j < cols; j++) {
            line += (grid[i][j].toS() + " ");
        }
        line += "\n";
        console.log(line);
    }

}

function main() {

    //Initialize Grid
    for (var i = 0; i < _ROWS; i++) {
        _minegrid[i] = [];
        for (var j = 0; j < _COLS; j++) {
            _minegrid[i][j] = new Cell();
        }
    }

    //Set mines 
    for (var k = 0; k < _NUM_OF_BOMBS; k++) {

        var pos = _randPosGen.nextPos();


        //console.log(pos);

        _minePoses.push(pos);

        _minegrid[pos[0]][pos[1]].setBomb();

    }

    var r, c, mr, mc;
    var deltas = [-1, 0, 1];
    for (var l in _minePoses) {
        mr = _minePoses[l][0];
        mc = _minePoses[l][1]
        for (var i1 in deltas) {
            for (var i2 in deltas) {
                if (i1 === 1 && i2 === 1) {
                    continue;
                }
                r = mr + deltas[i1];
                c = mc + deltas[i2];
                if (inGrid([r, c], _ROWS, _COLS)) {
                    if (!_minegrid[r][c].isBomb)
                        _minegrid[r][c].count++;
                }
            }
        }
    }

    printMineGrid(_minegrid);
}

main();