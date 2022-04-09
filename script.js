const listOfStepsL = ["L ", "L' ", "L2 "];
const listOfStepsR = ["R ", "R' ", "R2 "];
const listOfStepsU = ["U ", "U' ", "U2 "];
const listOfStepsD = ["D ", "D' ", "D2 "];
const listOfStepsB = ["B ", "B' ", "B2 "];
const listOfStepsF = ["F ", "F' ", "F2 "];


const timer = document.getElementById('stopwatch');
const avjTimer = document.getElementById('avjTimer');
var hr = 0;
var min = 0;
var sec = 0;
var milsec = 0;
var stoptime = true;

const average = arr => arr.reduce((a,b) => a + b, 0) / arr.length;


var AllPastTimes = [ "00 : 00 . 00", "00 : 00 . 00", "00 : 00 . 00", "00 : 00 . 00", "00 : 00 . 00", "00 : 00 . 00", "00 : 00 . 00", "00 : 00 . 00", "00 : 00 . 00", "00 : 00 . 00", "00 : 00 . 00", "00 : 00 . 00" ];

var rn = 0;

AddShuffle()
setTable()
TimeAvg()

function TimeAvg() {
    var allpasttimeP1 = [];
    var allpasttimeP2 = [];
    var allpasttimeP3 = [];
    for (let i = 0; i < AllPastTimes.length; i++) {
        const element = AllPastTimes[i];
        if (element != "00 : 00 . 00") {
            allpasttimeP1.push(parseInt(element.split(':')[0]))
            allpasttimeP2.push(parseInt(element.split(':')[1].split('.')[0]))
            allpasttimeP3.push(parseInt(element.split('.')[1]))
        }
        
    }
    // console.log(average(allpasttimeP1));
    // console.log(average(allpasttimeP2));
    // console.log(average(allpasttimeP3));
    if (("0" + Math.ceil(average(allpasttimeP2))).toString() != '0NaN') {
        var FinalAvg = ("0" + Math.ceil(average(allpasttimeP1))).slice(-2) + ' : ' + ("0" + Math.ceil(average(allpasttimeP2))) + ' . ' + ("0" + Math.ceil(average(allpasttimeP3)));
        avjTimer.innerHTML = 'average: <br/>' + FinalAvg;
    }else{
        avjTimer.innerHTML = 'average: <br/> 00 : 00 . 0';
    }
    
    
}

function givemeoneoutoftheset(GangaPutra) {
    switch(GangaPutra) {
        case 'L':
          return listOfStepsL[Math.floor(Math.random() * listOfStepsL.length)];
          break;
        case 'R':
          return listOfStepsR[Math.floor(Math.random() * listOfStepsR.length)];
          break;
        case 'U':
          return listOfStepsU[Math.floor(Math.random() * listOfStepsU.length)];
          break;
        case 'D':
          return listOfStepsD[Math.floor(Math.random() * listOfStepsD.length)];
          break;
        case 'B':
          return listOfStepsB[Math.floor(Math.random() * listOfStepsB.length)];
          break;
        case 'F':
          return listOfStepsF[Math.floor(Math.random() * listOfStepsF.length)];
          break;
      }
}


function AddShuffle() {
    const RandNO_NoOfStepsInShuffel = Math.floor(Math.random() * 10) + 1+20
    
    ShuffleStr = '';
    var LastSet = '';
    for (let i = 0; i < RandNO_NoOfStepsInShuffel; i++) {
        var CurrentSet = '';

        switch(LastSet) {
            case 'L':
                CurrentSet = 'RUFDB'.split('')[Math.floor(Math.random() * 'RUDB'.split('').length)];
                break;
            case 'R':
                CurrentSet = 'LFUDB'.split('')[Math.floor(Math.random() * 'LUDB'.split('').length)];
                break;
            case 'U':
                CurrentSet = 'LRFDB'.split('')[Math.floor(Math.random() * 'LRDB'.split('').length)];
                break;
            case 'D':
                CurrentSet = 'LRFUB'.split('')[Math.floor(Math.random() * 'LRUB'.split('').length)];
                break;
            case 'B':
                CurrentSet = 'LRFUD'.split('')[Math.floor(Math.random() * 'LRUD'.split('').length)];
                break;
            case 'F':
                CurrentSet = 'LRUBD'.split('')[Math.floor(Math.random() * 'LRUD'.split('').length)];
                break;
            default:
                CurrentSet = 'LRUFDB'.split('')[Math.floor(Math.random() * 'LRUDB'.split('').length)];
        }
        var FinalStep = givemeoneoutoftheset(CurrentSet);
        LastSet = CurrentSet;
        

        
        ShuffleStr = ShuffleStr + FinalStep;
    }
    console.log(ShuffleStr);
    document.getElementById('TheShuffleText').innerHTML = ShuffleStr;






    
}



function AddTime() {
    
    AllPastTimes.push(min + ' : ' + sec + ' . ' + milsec)
    AllPastTimes = AllPastTimes.slice(1, 13);
    setTable()
    TimeAvg()
}

function setTable() {
    const TheTable = document.getElementById('TheTable')
    var ab=
    `
        <tr class="table-auto border-2 mx-auto">
         <th class="w-32 ">Time</th>
        </tr>
    `;

    for (let i = 0; i < AllPastTimes.length; i++) {
        const element = AllPastTimes[i];
        ab = ab + `
        <tr class="table-auto border w-full">
         <td><h1 class="w-max mx-auto">`+element+`</h1></td>
        </tr>
        `
    }
    TheTable.innerHTML = ab
}







function startTimer() {
    if (stoptime == true) {
        stoptime = false;
        timerCycle();
    }
}
function stopTimer() {
    if (stoptime == false) {
        AddTime()
        stoptime = true;
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
        
        if (milsec == 100) {
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
        
        if(min == 0){
            timer.innerHTML = sec + '.' + milsec;
        }else{
            timer.innerHTML = min + ':' + sec + '.' + milsec;
        }
        console.log(min.valueOf);


        setTimeout("timerCycle()", 10);
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