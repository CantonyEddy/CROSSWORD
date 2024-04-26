const emptyPuzzle = `2001
0..0
1000
0..0`;
const words = ['casa','alan','ciao','anta'];
crosswordSolver(emptyPuzzle, words);

function crosswordSolver(emptyPuzzle, words){
    tabEmptyPuzzle = strToTab(emptyPuzzle);
    tabEmptyPuzzle2 =  copieProfonde(tabEmptyPuzzle);
    console.log(tabEmptyPuzzle);
    solve(tabEmptyPuzzle, tabEmptyPuzzle2, words, 0);
}

function solve(grid, grid2, words, index) {
    console.log(grid);
    if (index === words.length) {
        return true;
    }
    for (let i = 0; i < grid2.length; i++) {
        for (let j = 0; j < grid2[i].length; j++) {
            if (typeof grid2[i][j] === 'number' && grid2[i][j] > 0) {
                if (j > 0 && j < grid2[i].length - 1 && grid2[i][j - 1] === "." && grid2[i][j + 1] === 0) {
                    if (canPlaceWordAt(i, j, "horizontal", grid, words[index])) {
                        let newGrid = copieProfonde(grid);
                        newGrid = placeWord(i, j, "horizontal", newGrid, words[index]);
                        let newGrid2 = copieProfonde(grid2);
                        newGrid2[i][j]--;
                        if (solve(newGrid, newGrid2, words, index + 1)) {
                            return true;
                        }
                    }
                }
                if (j === 0 && grid2[i][j + 1] === 0) {
                    if (canPlaceWordAt(i, j, "horizontal", grid, words[index])) {
                        let newGrid = copieProfonde(grid);
                        newGrid = placeWord(i, j, "horizontal", newGrid, words[index]);
                        let newGrid2 = copieProfonde(grid2);
                        newGrid2[i][j]--;
                        if (solve(newGrid, newGrid2, words, index + 1)) {
                            return true;
                        }
                    }
                }
                if (canPlaceWordAt(i, j, "vertical", grid, words[index])) {
                    let newGrid = copieProfonde(grid);
                    newGrid = placeWord(i, j, "vertical", newGrid, words[index]);
                    let newGrid2 = copieProfonde(grid2);
                    newGrid2[i][j]--;
                    if (solve(newGrid, newGrid2, words, index + 1)) {
                        return true;
                    }
                }
            }
        }
    }
    return false;
}


function canPlaceWordAt(x, y, direction, grid, word){
    if (grid[x][y] <= 0){
        return false;
    }
    if (direction === "horizontal"){
        for (let i = 0; i < word.length; i++){
            if (y + i >= grid[0].length){
                return false;
            }
            if (typeof grid[x][y+i] === 'string'){
                if (grid[x][y+i] !== word[i] && grid[x][y+i] !== "."){
                    return false;
                }
            }
        }
    } else if (direction === "vertical"){
        for (let i = 0; i < word.length; i++){
            if (x + i >= grid.length){
                return false;
            }
            if (typeof grid[x+i][y] === 'string'){
                if (grid[x+i][y] !== word[i] && grid[x+i][y] !== "."){
                    return false;
                }
            }
        } 
    }
    return true;
}


function placeWord(x, y, direction, grid, word){
    if (direction === "horizontal"){
        for (let i = 0; i < word.length; i++){
            grid[x][y+i] = word[i];
        }
    }else if (direction === "vertical"){
        for (let i = 0; i < word.length; i++){
            grid[x+i][y] = word[i];
        } 
    }
    return grid;
}

function strToTab(str){
    tab = [];
    tempoTab = [];
    for (let i = 0; i < str.length; i++){
        if (str[i] === '\n'){
            tab.push(tempoTab);
            tempoTab = [];
        }else{
            if (str[i] === '.'){
                tempoTab.push(str[i]);
            }else{
                tempoTab.push(parseInt(str[i]));
            }
        }
    }
    tab.push(tempoTab);
    return tab;
}

function copieProfonde(tableau) {
    var copie = [];
    for (var i = 0; i < tableau.length; i++) {
        if (Array.isArray(tableau[i])) {
            copie[i] = copieProfonde(tableau[i]);
        } else {
            copie[i] = tableau[i];
        }
    }
    return copie;
}