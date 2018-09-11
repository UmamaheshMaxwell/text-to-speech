// Init SpeechSynth API
const synth = window.speechSynthesis;

// DOM Elements
const textForm = document.querySelector('form');
const textInput = document.querySelector('#text-input');
const voiceSelect = document.querySelector('#voice-select');
const rate = document.querySelector('#rate');
const rateValue = document.querySelector('#rate-value');
const pitch = document.querySelector('#pitch');
const pitchValue = document.querySelector('#pitch-value');
console.log(`pitch`, pitch.value)
    // Init voices array
let voices = [];
const getVoices = () => {
    voices = synth.getVoices();

    voices.forEach(voice => {
        // Create Option Element
        const option = document.createElement('option');
        // Fill option with voice and language
        option.textContent = `${voice.name}(${voice.lang})`;

        // Set needed option attributes
        option.setAttribute('data-name', voice.name);
        option.setAttribute('data-lang', voice.lang)
        voiceSelect.appendChild(option);
    })
}

getVoices();
// This is written seperately as onvoiceschanged may not be supported
// in some of the browsers 
if (synth.onvoiceschanged !== undefined) {
    synth.onvoiceschanged = getVoices;
}

// Speak
const speak = () => {
    // Check if speaking
    if (synth.speaking) {
        console.error('Already speaking... !!!')
        return;
    }
    if (textInput.value !== '') {
        // Get Speak text
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        // Speak End
        speakText.onend = () => {
            console.log('Done Speaking ...!!!')
        }

        // Speak Error
        speakText.error = () => {
            console.log('Sorry my apolgies I couldn\'t speak')
        }

        // Selected voice
        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute('data-name');

        // Loop through the voices
        voices.forEach(voice => {
            if (voice.name === selectedVoice) {
                speakText.voice = voice;
            }
        });

        // Set pitch and rate
        console.log(`rate.value`, rate)
        speakText.rate = rate.value;
        speakText.pitch = pitch.value;

        // Speak
        synth.speak(speakText);
    }
}

// EVENT LISTENERS

//TextForm Submit
textForm.addEventListener('submit', () => {
    event.preventDefault();
    speak();
    textInput.blur();
});

// Rate value change
rate.addEventListener('change', () => {
    rateValue.textContent = rate.value;
});

pitch.addEventListener('change', () => {
    pitchValue.textContent = pitch.value;
});

voiceSelect.addEventListener('change', () => speak());