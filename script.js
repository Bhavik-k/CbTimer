const timer = document.getElementById('stopwatch');
var hr = 0;
var min = 0;
var sec = 0;
var milsec = 0;
var stoptime = true;



const listOfSteps = [
    "L ", "L' ", "L2 ",
    "R ", "R' ", "R2 ",
    "U ", "U' ", "U2 ",
    "D ", "D' ", "D2 ",
    "B ", "B' ", "B2 ",
];


var AllPastTimes = ["--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--", "--"];





var ShuffleStr = '';

const sleep = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds))
}

AddShuffle()
async function AddShuffle() {
    const RandNO_NoOfStepsInShuffel = Math.floor(Math.random() * 10) + 1+10
    console.log(RandNO_NoOfStepsInShuffel);
    ShuffleStr = '';
    for (let i = 0; i < RandNO_NoOfStepsInShuffel; i++) {
        const element = listOfSteps[Math.floor(Math.random() * listOfSteps.length) ];
        ShuffleStr = ShuffleStr + element;
        // console.log(element)
    }
    console.log(ShuffleStr);
    document.getElementById('TheShuffleText').classList.add('animate-pulse');
    await sleep(1000)
    document.getElementById('TheShuffleText').innerHTML = ShuffleStr;
    document.getElementById('TheShuffleText').classList.remove('animate-pulse')
}
AddTime()
function AddTime() {
    const TheTable = document.getElementById('TheTable')
    var ab=
    `
        <tr class="table-auto border-2 mx-auto">
         <th>Name</th>
         <th>Favorite Color</th>
        </tr>
    `;

    for (let i = 0; i < AllPastTimes.length; i++) {
        const element = AllPastTimes[i];
        ab = ab + `
        <tr class="table-auto border">
         <td><h1 class="mx-auto">`+element+`</h1></td>
        </tr>
        `
    }
    TheTable.innerHTML = ab

    AllPastTimes.push(min + ' : ' + sec + ' . ' + milsec)
    AllPastTimes = AllPastTimes.slice(1, 13);
    console.log(AllPastTimes);
    
}

















function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
    if (stoptime == false) {
        stoptime = true;
        AddTime()
    }
}
function resetTimer() {
    hr = 0;
    min = 0;
    sec = 0;
    milsec = 0;
    timer.innerText = '00:00.00';
}

function timerCycle() {
    if (stoptime == false) {
        milsec = parseInt(milsec);
        sec = parseInt(sec);
        min = parseInt(min);
        hr = parseInt(hr);

        milsec = milsec + 1;
        
        if (milsec == 10) {
            sec = sec + 1;
            milsec = 0;
        }
        if (sec == 60) {
            min = min + 1;
            sec = 0;
        }
        if (min == 60) {
            hr = hr + 1;
            min = 0;
            sec = 0;
        }
        
        if (sec < 10 || sec == 0) {
            sec = '0' + sec;
        }
        if (min < 10 || min == 0) {
            min = '0' + min;
        }
        if (hr < 10 || hr == 0) {
            hr = '0' + hr;
        }
        
    timer.innerHTML = min + ' : ' + sec + ' . ' + milsec;

    setTimeout("timerCycle()", 100);
  }
}


document.addEventListener('keyup', (event) => {
    var name = event.key;
    var code = event.code;
    if (code == 'Space') {
        if (stoptime == true) {
            resetTimer()
            startTimer()
        }else{
            stopTimer()
        }
    }
  }, false);