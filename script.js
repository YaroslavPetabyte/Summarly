const adderGrid = document.querySelector('.adder__grid');
const adderSumDigrits = document.querySelector('.adder__sum-digrits');
const adderStart = document.querySelector('.adder__start');

const colactionAllColumns = Array.from(adderGrid.tBodies[0].children);

let dynamicArray = [];
let selectTheNextColumn = 1;
let orderNum;
let currentColumn;
let accumArray = [];
let numberChange = 0;
let columnTab = 0;

function randomNumber() {
    let random = (Math.round(Math.random() * 100000)).toString();

    while(random.length < 5) {
        random = "0" + random
    }

    return random;
}

function numInArr() {
    const numFromRundom = randomNumber();
    const arrFromNum = Array.from(numFromRundom);
    return arrFromNum;
}

function sumNumDigris(arr) {
    let sumNum = 0;
    let arrNum = arr;
    for(let num of arrNum) {
        sumNum = sumNum + +num
    }
    return sumNum;
}

adderStart.addEventListener('click', startGame);


function startGame() {
    if(adderGrid.classList.contains('active')) return
    orderNum = 0;

    const numRundom = numInArr();
    const randomArrSum = sumNumDigris(numRundom)
    adderSumDigrits.innerHTML = randomArrSum;

    activationOfTheActiveColumn(colactionAllColumns[orderNum], numRundom);
}

function activationOfTheActiveColumn(colaction, numRundom) {
    const elementsFirstColem = colaction.children;

    adderGrid.classList.add('active');
    elementChange(elementsFirstColem, numRundom);
}


function elementChange(elem, numRundom) {

    for(let i = elem.length - 1; i >= 0; i--) {
        const input = elem[i].firstChild;
        input.removeAttribute('disabled');
        input.classList.add("number" + i);
        input.addEventListener('input', inputHeandler)
        approvalofElements(input, i, numRundom);
        // if(i === 2) continue;
        focusElem(input);
    }

    currentColumn = elem;
}

function focusElem(elem) {
    try {
        elem.focus()
    } catch(e) {
    }
}


function approvalofElements(elems, index, numRundom) {
    elems.addEventListener('keypress', function(e){
        if(e.which !== 13) return
        e.preventDefault();
        setNum(elems, index, numRundom);
    })
}

function checkFilledCell(operator) {
    try {
        if(document.querySelectorAll('.number' + numberChange)[columnTab].classList.contains('prepaped')) {
            numberChange = numberChange + operator;
            checkFilledCell(operator)
        }
    } catch(e) {
        numberChange = numberChange - operator;
    }
}

// focus on element
window.addEventListener('click', e => {
    let curElement = document.activeElement
    let numFocusElem = parseInt(curElement.className.match(/\d+/));
    numberChange = numFocusElem;
});

document.addEventListener('keydown', function(e){
    if(e.key == 'ArrowRight') {
        if(numberChange === 4) numberChange = -1;
        if(numberChange < 4) {
            numberChange++;
            checkFilledCell(1);
        focusElem(document.querySelectorAll('.number' + numberChange)[columnTab])
        }

    }
    if(e.key == 'ArrowLeft') {
        if(numberChange === 0) numberChange = 5;
        if(numberChange > 0) {
            numberChange--;
            checkFilledCell(-1);
        focusElem(document.querySelectorAll('.number' + numberChange)[columnTab])
        }
    }
});
/// focus on element

function inputHeandler() {
    this.value = this.value.replace(/[^0-9]/g, '');
}

function setNum(elem, index, numRundom) {
    if(!elem.value.length > 0) return
    elem.setAttribute('disabled', '');
    elem.classList.add('prepaped');
    dynamicArray[index] = elem.value;
    arrangementOfTheArray(dynamicArray, numRundom)
}

function arrangementOfTheArray(arr, numRundom) {
    if(arr.length !== 5 || arr.includes(undefined)) return
    // console.log(numRundom)
    // console.log(arr)
    for (let i = 0; i < numRundom.length; i++) {
        for(let j = 0; j < numRundom.length; j++) {
            if(numRundom[i] === arr[j]) {
                yellowRepainting(j)
            }
        }
        if(numRundom[i] === arr[i]) {
            greenRepainting(i)
        }
    }
    if(checkingForWin(arr, numRundom)) return
    nextColumn(numRundom);
    dynamicArray = [];
}

function yellowRepainting(index) {
    currentColumn[index].children[0].classList.add("yellow--style");
}

function greenRepainting(index) {
    currentColumn[index].children[0].classList.add("green--style");
}

function nextColumn(numRundom) {
    if(youLose(selectTheNextColumn, colactionAllColumns)) return
    activationOfTheActiveColumn(colactionAllColumns[selectTheNextColumn], numRundom);
    selectTheNextColumn += 1;
    columnTab++;
    numberChange = 0;
}

function checkingForWin(arr, numRundom) {
    let accum = []
    for(let i = 0; i < arr.length; i++) {
        if(arr[i] === numRundom[i]) {
            accum.push(1);
        }
    }
    if(accum.length >= 5) {
        setTimeout(() => (alert("You win! 😀")), 0)
        document.location.reload();
        return true
    }
}

function youLose(selectTheNextColumn, colactionAllColumns) {
    if(selectTheNextColumn >= colactionAllColumns.length) {
       setTimeout(() => (alert("You lose 😞")), 0)
        document.location.reload();
        return true
    }
}
