const synth = window.speechSynthesis;

//DOM Element
const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#rate-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");
const voiceSelect = document.querySelector("#voice-select");
const body = document.querySelector("body");

//Init voice arry
let voices = [];

function getVoices() {
    voices = synth.getVoices();
    for (i = 0; i < voices.length; i++) {
        const option = document.createElement("option");
        //fill option with voice and language
        option.textContent = voices[i].name + '(' + voices[i].lang + ')';
        //set option attributes
        option.setAttribute('data-lang', voices[i].lang);
        option.setAttribute('data-name', voices[i].name);
        voiceSelect.appendChild(option);
    }
}
getVoices();
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}
//Speak
const speak = () => {
    //check if speaking
    if (synth.speaking) {
        console.error("Already speaking..")
        return;
    }
    //check textarea is not empty
    if (textInput.value !== '') {
        body.style.background = "#1e272e url(imgg/wave.gif)";
        body.style.backgroundRepeat = "repeat-x";
        body.style.backgroundSize = "100% 100%";
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        //speak end
        speakText.onend = e => {
            body.style.background = "#1e272e";
            console.log("Done Speaking...");
        };
        //Speak error
        speakText.onerror = e => {
            console.log("Anything went wrong...");
        };
        //select voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');
        for (i = 0; i < voices.length; i++) {
            if (voices[i].name == selectedVoice) {
                speakText.voice = voices[i];
            }
        }
        //set pitch and rate
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;
        //speak
        synth.speak(speakText);

    }
};

//eventlistner
//Text form submit
textForm.addEventListener('submit', e => {
    e.preventDefault();
    speak();
    textInput.blur();
});
//Rate value change
rate.addEventListener('change', e => (rateValue.textContent = rate.value));
//pitch value change
pitch.addEventListener('change', e => (pitchValue.textContent = pitch.value));
//voiceSelect change
voiceSelect.addEventListener('change', e => speak());