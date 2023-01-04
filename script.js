let puzz = document.getElementById("puzzle")
let btn = document.getElementById("btn")

for (let i = 0; i < 81; i++) {
    let newinp = document.createElement('input');
    newinp.setAttribute("type", "number");
    newinp.setAttribute("min", 1)
    newinp.setAttribute("max", 9)
    newinp.setAttribute("required", "true")
    puzz.appendChild(newinp)
    if(i<27 && ((i%9==0) || (i%9==1) ||(i%9)==2)){
        newinp.classList.add("odd-section")
    }
    if(i<27 && ((i%9==6) || (i%9==7) ||(i%9)==8)){
        newinp.classList.add("odd-section")
    }
    if(i<54 && i>27 && ((i%9==3) || (i%9==4) ||(i%9)==5)){
        newinp.classList.add("odd-section")
    }
    if(i>=54 && ((i%9==0) || (i%9==1) ||(i%9)==2)){
        newinp.classList.add("odd-section")
    }
    if(i>54 && ((i%9==6) || (i%9==7) ||(i%9)==8)){
        newinp.classList.add("odd-section")
    }

}

const joinValues = (values) => {
    let newinp = document.querySelectorAll('input');
    let temp = [];
    let i = 1;
    newinp.forEach(element => {
        if (element.value) {
            temp.push(Number.parseInt(element.value));
        }
        else {
            temp.push('.');
        }
        if (i % 9 == 0) {
            values.push(temp);
            temp = [];
        }
        i++;
    });
    return values;
}

function notInRow(arr, row) {
    let st = new Set();

    for (let i = 0; i < 9; i++) {

        if (st.has(arr[row][i]))
            return false;

        if (arr[row][i] != '.')
            st.add(arr[row][i]);
    }
    return true;
}

function notInCol(arr, col) {
    let st = new Set();

    for (let i = 0; i < 9; i++) {

        if (st.has(arr[i][col]))
            return false;

        if (arr[i][col] != '.')
            st.add(arr[i][col]);
    }
    return true;
}

function notInBox(arr, startRow, startCol) {
    let st = new Set();

    for (let row = 0; row < 3; row++) {
        for (let col = 0; col < 3; col++) {
            let curr = arr[row + startRow][col + startCol];

            if (st.has(curr))
                return false;

            if (curr != '.')
                st.add(curr);
        }
    }
    return true;
}


function isValid1(arr, row, col) {
    return notInRow(arr, row) && notInCol(arr, col) &&
        notInBox(arr, row - row % 3, col - col % 3);
}


function isValidConfig(arr, n) {
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {

            if (!isValid1(arr, i, j))
                return false;
        }
    }
    return true;
}


function solveSudoku(grid) {
    function isValid(row, col, num) {
        for (let i = 0; i < 9; i++) {
            if (grid[row][i] === num || grid[i][col] === num) return false;
            if (grid[Math.floor(row / 3) * 3 + Math.floor(i / 3)][Math.floor(col / 3) * 3 + i % 3] === num) return false;
        }
        return true;
    }

    function findEmpty() {
        for (let i = 0; i < 9; i++) {
            for (let j = 0; j < 9; j++) {
                if (grid[i][j] === '.') return [i, j];
            }
        }
        return [-1, -1];
    }

    function solve() {
        let [row, col] = findEmpty();
        if (row === -1) return true;

        for (let num = 1; num <= 9; num++) {
            if (isValid(row, col, num)) {
                grid[row][col] = num;
                if (solve()) return true;
                grid[row][col] = '.';
            }
        }
        return false;
    }

    if (grid === null || grid.length !== 9 || grid[0].length !== 9) return false;
    return solve();
}


const populateValues = (grid) => {
    let temp = []
    grid.forEach((e)=>{
        e.forEach(i=>{
            temp.push(i);
        })
    })
    let newinp = document.querySelectorAll('input');
    let i = 0;
    newinp.forEach((element) => {
        element.value = temp[i++];
    })

}

const finalsolve = () => {
    let values = []
    values = joinValues(values);
    if(!isValidConfig(values,9)){
        let a = document.getElementById("alert")
        a.classList.toggle("d-none");
        setTimeout(() => {
            a.classList.toggle("d-none");
        }, 3000);
    }
    else{
        solveSudoku(values);
        populateValues(values);
    }
    console.log(values);
}
const clearAll = ()=>{
    let newinp = document.querySelectorAll('input');
    newinp.forEach(e=>{
        e.value = '';
    })
}

cl.addEventListener('click',clearAll)
btn.addEventListener('click', finalsolve);