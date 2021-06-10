const WHITE_KEYS = ["a", "s", "d", "f", "g", "h", "j"];
const BLACK_KEYS = ["w", "e", "r", "t", "y"];
const DRUMS_KEYS = ["1" , "2" , "3" , "4" , "5" , "6" , "7" , "8"];

const keys = document.querySelectorAll(".key");

const whiteKeys = document.querySelectorAll(".key.white");

const blackKeys = document.querySelectorAll(".key.black");

const drumKit = document.querySelectorAll(".drumKit");

const pianoButton = document.getElementById("pianoButton");
const drumKitButton = document.getElementById("drumKitButton");

const instrumentsButtons = [pianoButton , drumKitButton];

let currentInstrument = "";
let isStarted = false;

function onStartPlay(event){
    console.log(event)
    event.style.display = "none"
    isStarted = true;
    document.getElementById("chooseInstrument").classList.remove("noDisplay");
    return isStarted;
}

function isStartedPlayingClicked(){
    let pageLoadMessageText = document.getElementById("pageLoadMessage");
    setStartUpMessage(pageLoadMessageText);

    if(!isStarted){
        console.log(document.getElementById("chooseInstrument"))
        document.getElementById("chooseInstrument").classList.add("noDisplay");
    }

}

function setStartUpMessage(textElement){
    for(let i = 0; i < WHITE_KEYS.length; i++){
        textElement.innerHTML +=  WHITE_KEYS[i] + ",";
    } 
    
    for(let i = 0; i < BLACK_KEYS.length; i++){
        textElement.innerHTML += BLACK_KEYS[i] + ","
    }
    textElement.innerHTML += " for Piano  <br>"
    for(let i = 0; i < DRUMS_KEYS.length; i++){
        textElement.innerHTML += DRUMS_KEYS[i] + ",";
    }
    textElement.innerHTML += " for drums kit  <br>";
    
    setTimeout(initTextMessage(textElement) , ()=>  3000);
    return textElement;
}

function initTextMessage(textMessage){
    textMessage.innerHTML = "";
    return textMessage.innerHTML;
}

function handleInstrumentChange(e) {

    makeApearenceOnlyForOneInstrumentAtaTime();
    let instrument = e.innerHTML.trim();
    let element = document.getElementById(instrument).id;
    if(isCurrentInstrumentOnFocus(instrument,element)){
        document.getElementById(instrument).classList.add("activated");
        forceOneInstrument(instrument);
        hideButtonsAfterClick(e.id)
    }
}

function forceOneInstrument(instrument){
    currentInstrument = instrument;
}

function hideButtonsAfterClick(eventId){

        for(let currentButtonIndex = 0; currentButtonIndex < instrumentsButtons.length; currentButtonIndex++){
            if(eventId == instrumentsButtons[currentButtonIndex].id){
                instrumentsButtons[currentButtonIndex].style.display = "none";
            }else{
                instrumentsButtons[currentButtonIndex].style.display = "block";
            }
        }
}

function isCurrentInstrumentOnFocus(currentInstrument, currentElementClicked){
    if(currentInstrument == currentElementClicked){
        return true;
    }
    return false;
}

function makeApearenceOnlyForOneInstrumentAtaTime(){
    if(document.getElementsByClassName("activated").length >= 1){
        document.getElementsByClassName("activated")[0].classList.remove("activated");
    }
}

keys.forEach(key => {
    key.addEventListener("click", () => playNote(key));
})


document.addEventListener("keydown" , e => {
    if (didKeyMouseUp(e.repeat)) {
        return;
    }
    const key = e.key;
    const drumKitIndex = DRUMS_KEYS.indexOf(key);

    if(drumKitIndex > -1){
        playDrum(drumKit[drumKitIndex]);
    }
})

document.addEventListener("keydown", e => {
    if (didKeyMouseUp(e.repeat)) {
        return;
    }

    const key = e.key;
    const whiteKeyIndex = WHITE_KEYS.indexOf(key);
    const blackKeyIndex = BLACK_KEYS.indexOf(key);

    condintionalyPlayNote(blackKeyIndex, whiteKeyIndex);

});

function didKeyMouseUp(repeatedKey) {
    if (repeatedKey) {
        return true;
    }
    return false
}

function condintionalyPlayNote(currentBlackKeyIndex, currentWhiteKeyIndex) {
    if (currentWhiteKeyIndex > -1) {
        playNote(whiteKeys[currentWhiteKeyIndex]);
    }

    if (currentBlackKeyIndex > -1) {
        playNote(blackKeys[currentBlackKeyIndex]);
    }
}

function playNote(key) {
    if(currentInstrument != key.parentElement.id){
        return;
    }
    const noteAudio = document.getElementById(key.dataset.note);
    resetCell(noteAudio);
    handlePianoCellApearence(key, noteAudio);
}

    function resetCell(noteAudio){
        noteAudio.currentTime = 0;
        noteAudio.play();
    }

function handlePianoCellApearence(key, noteAudio) {
    key.classList.add("active");
    console.log(key)
    noteAudio.addEventListener("ended", () => {
        key.classList.remove("active");
    });
}

// DRUMS =>


drumKit.forEach(drum => {
    drum.addEventListener("click" , () => playDrum(drum));
})

function playDrum(drum){
    if(currentInstrument != drum.parentElement.id){
        return;
    }
    const currentDrum = document.getElementById(drum.dataset.drum);
    resetCell(currentDrum);
    handlePianoCellApearence(drum , currentDrum)
}