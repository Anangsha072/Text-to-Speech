// Check if the browser supports Speech Synthesis API
if (!'speechSynthesis' in window) {
    alert("Sorry, your browser does not support Text-to-Speech!");
}

const textInput = document.getElementById("text-input");
const speakButton = document.getElementById("speak-btn");
const voiceSelect = document.getElementById("voice-select");

let voices = [];

// Function to populate voices
function loadVoices() {
    voices = speechSynthesis.getVoices();
    voiceSelect.innerHTML = ""; // Clear existing options
    
    voices.forEach((voice, index) => {
        const option = document.createElement("option");
        option.value = index;
        option.textContent = `${voice.name} (${voice.lang})`;
        voiceSelect.appendChild(option);
    });
}

// Load voices when available
speechSynthesis.onvoiceschanged = loadVoices;

// Speak function
function speakText() {
    const text = textInput.value;
    if (text.trim() === "") {
        alert("Please enter some text.");
        return;
    }

    const utterance = new SpeechSynthesisUtterance(text);
    const selectedVoice = voices[voiceSelect.value];
    
    if (selectedVoice) {
        utterance.voice = selectedVoice;
    }
    
    speechSynthesis.speak(utterance);
}

// Event Listener for Speak Button
speakButton.addEventListener("click", speakText);
