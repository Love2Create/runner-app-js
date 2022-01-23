const form = document.querySelector("form").addEventListener("submit", handleDefault);
let entries = [];
const entriesWrapper = document.querySelector("#entries-wrapper ul");
const goal = 25;
let totalMiles;

function populateNewEntry(newEntry){
    entriesWrapper.removeChild(entriesWrapper.firstElementChild);
    const listItem = document.createElement('li');
    const listValue = document.createTextNode(newEntry);
    listItem.appendChild(listValue);
    entriesWrapper.appendChild(listItem);
}

function calcMiles(){
    totalMiles = entries.reduce((total, item)=> {
        return total+item;
    }, 0);
    document.querySelector("#totalOutput").innerHTML = totalMiles;
}

function calcAverageMiles(){
    calcMiles();
    if(entries.length<7){
        let average = document.querySelector("#averageDistanceOutput").innerHTML = (totalMiles/entries.length).toFixed(2);
    }if(entries.length === 8){
        let average = document.querySelector("#averageDistanceOutput").inerHTML = (totalMiles/7).toFixed(2);
        entries.shift();
    }
}

function calcHighest(){
    let highest = Math.max(...entries);
    document.querySelector("#thisWeekHighOutput").innerHTML=highest;
}

function calcProgress(){
    let progressTotal = totalMiles;
    document.querySelector("#progressTotal").innerHTML = ` ${progressTotal} `;
}

function calcGoal(){
    let completedPercent = totalMiles/(goal/100);
    if(completedPercent >= 100){
            completedPercent = 100;
    }
    document.querySelector("#progress-circle").style.background = `conic-gradient(green ${completedPercent}%, gray ${completedPercent}% 100%)`;
}

function handleDefault(event){
    event.preventDefault();
    const entry = Number(document.querySelector("#mileNumInput").value);

    if(!entry) return;
    document.querySelector("form").reset();
    if(entries.length<7){
        entries.push(entry);
    }else{
        entries.push(entry);
        entries.shift();
    }
    populateNewEntry(entry);
    calcMiles();
    calcAverageMiles();
    calcHighest();
    calcProgress();
    calcGoal();
}
