const micButton = document.getElementById("micButton");
const listenText = document.getElementById("listenText");

const userCommand = document.getElementById("userCommand");
const jarvisResponse = document.getElementById("jarvisResponse");

const systemStatus = document.getElementById("systemStatus");



const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

let recognition;

if (SpeechRecognition) {

    recognition = new SpeechRecognition();

    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.lang = "en-IN";

} else {

    listenText.innerText =
        "Speech recognition is not supported in this browser.";

    micButton.disabled = true;
}



micButton.addEventListener("click", () => {

    if (!recognition) {
        return;
    }

    recognition.start();

    document.body.classList.add("listening");

    listenText.innerText = "Listening...";
    systemStatus.innerText = "Listening";
});



if (recognition) {

    recognition.onresult = function (event) {

        const command =
            event.results[0][0].transcript;

        userCommand.innerText = command;

        document.body.classList.remove("listening");

        systemStatus.innerText = "Processing";

        processCommand(command);
    };


    
    recognition.onerror = function () {

        document.body.classList.remove("listening");

        listenText.innerText =
            "Sorry, I couldn't hear you.";

        systemStatus.innerText =
            "System Ready";
    };


    
    recognition.onend = function () {

        document.body.classList.remove("listening");

        systemStatus.innerText =
            "System Ready";

        listenText.innerText =
            "Click the microphone to speak";
    };
}



function processCommand(command) {

    const text = command.toLowerCase();

    let response = "";


    if (text.includes("hello") || text.includes("hi")) {

        response =
            "Hello! I am JARVIS. How can I help you?";

    }


    else if (text.includes("time")) {

        const time =
            new Date().toLocaleTimeString();

        response =
            "The current time is " + time;

    }


    else if (text.includes("date")) {

        const date =
            new Date().toLocaleDateString();

        response =
            "Today's date is " + date;

    }


    else if (text.includes("google")) {

        response = "Opening Google.";

        window.open(
            "https://www.google.com",
            "_blank"
        );

    }


    else if (text.includes("youtube")) {

        response = "Opening YouTube.";

        window.open(
            "https://www.youtube.com",
            "_blank"
        );

    }


    else if (text.includes("joke")) {

        response =
            "Why do programmers prefer dark mode? Because light attracts bugs!";

    }


    else {

        response =
            "I heard you say " +
            command +
            ". I am still learning this command.";

    }


    jarvisResponse.innerText = response;

    speak(response);

    systemStatus.innerText = "System Ready";
}



function speak(text) {

    const speech =
        new SpeechSynthesisUtterance(text);

    speech.lang = "en-IN";
    speech.rate = 0.95;
    speech.pitch = 1;

    window.speechSynthesis.speak(speech);
}



function quickCommand(command) {

    userCommand.innerText = command;

    processCommand(command);
}