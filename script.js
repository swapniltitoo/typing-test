const textInput = document.querySelector('.textInput');
const textContainer = document.querySelector('.text-container');
const container = document.querySelector('.container');
const firstRow = document.querySelector('.text-container .first-row');
const secondRow = document.querySelector('.text-container .second-row');
const timer = document.querySelector('.timer');
const reportContainer = document.querySelector('.report');
const wpm = document.querySelector('.wpm');
const accuracy = document.querySelector('.accuracy');
const rightKeystrokes = document.querySelector('.right-keystrokes');
const wrongKeystrokes = document.querySelector('.wrong-keystrokes');
const rightWords = document.querySelector('.right-words');
const wrongWords = document.querySelector('.wrong-words');

var textSample = new Array();

var string  = "the more sentence between of day set city to could three tree and go want cross a come air since in did well hard is my also start it sound play might you no small story that most end saw he number put far was who home sea for over read draw on know hand left are water port late with than large run as call spell don't I first add while his people even press they may land close be down here night at side must real one been big life have now high few this find such stop from any follow open or new act seem had work why together by part ask next hot take men white but get change children some place went begin what made light got there live kind walk we where off example can after need ease out back house paper other little picture often were only try always all round us music your man again those when year animal both up came point mark use show mother book word every world letter how good near until said me build mile an give self river each our earth car she under father feet which name head care do very stand second their through own group time just page carry if form should took will much country rain way great found eat about think answer room many say school friend then help grow began them low study idea would line still fish write before learn mountain like turn plant north so cause cover once these same food base her mean sun hear long differ four horse make move thought cut thing right let sure see boy keep watch him old eye colour two too never face has does last wood look tell door main";

var textSample = string.split(" ");

var text = new Array();

for (let i = 0; i < 1000; i++) {
    text[i] = textSample[Math.floor(Math.random() * textSample.length-1)];
}

function onload() {
    i = 0;
    report = 0;
    test = true;
    keystroke = 0;
    rightKeystroke = 0;
    wrongKeystroke = 0;
    rightWord = 0;
    wrongWord = 0;

    reportContainer.style.display = 'none';

    firstRow.innerHTML = '';
    secondRow.innerHTML = '';

    for (let i = 0; i < 10; i++) {
        firstRow.innerHTML += `<li class = "unactive" id = "${i}">${text[i]}</li> `;
        secondRow.innerHTML += `<li class = "unactive" id = "${i+10}">${text[i+10]}</li> `;
    }

    textInput.focus();
}

textInput.addEventListener("keyup", (event) => {
    // if (i == 0 && textInput.value.length == 1) {
    //     startTimer();
    //     console.log('hello!')
    // }
    
    keystroke++;
    
    if (textInput.value == "" || textInput.value == " ") {
        textvalue = textInput.value;
        textvalue = textvalue.trim();
        textInput.value = textvalue;
    }

    letters = textInput.value.length;
    
    if (text[i].slice(0, letters) == textInput.value) {
        document.getElementById(i).style.color = "black";
        rightKeystroke++;
    } else if (text[i].slice(0, letters) != textInput.value) {
        document.getElementById(i).style.color = "red";
        wrongKeystroke++;
    } else if (text[i].length < letters) {
        document.getElementById(i).style.color = "red";
        wrongKeystroke++;
    }
});

textInput.addEventListener("keydown", (event) => {
    if (i == 0 && textInput.value.length == 0) {
        startTimer();
    }

    
    document.getElementById(i).className = 'active';

    if (event.keyCode == 32) {
        if (text[i] == textInput.value) {
            document.getElementById(i).style.color = "green";
            if (test == true) {
                report++;
                rightWord++;
                i++;
            }
        } else if (text[i] != textInput.value && textInput.value != "" && textInput.value != " ") {
            document.getElementById(i).style.color = "red";
            if (test == true) {
                wrongWord++;
                i++;
            }
        }

        textInput.value = "";
        
        if (i % 10 == 0) {
            firstRow.innerHTML = secondRow.innerHTML;
            secondRow.innerHTML = '';
            for (let n = i; n < i + 10; n++) {
                secondRow.innerHTML += `<li class = "unactive" id = "${n+10}">${text[n+10]}</li> `;
            }
        }

        document.getElementById(i).className = 'active';
        document.getElementById(i-1).className = 'unactive';        
    }
});

function startTimer() {
    time = 59
    startTime = setInterval(() => {
        if (time > 9) {
            timer.innerHTML = `00:${time}`;
        } else {
            timer.innerHTML = `00:0${time}`;
        }
        if (time == 0) {
            stop();
        }
        time--;
    }, 1000);

}

function stop() {
    test = false;
    wpm.innerHTML = `${report}`;
    accuracy.innerHTML = `${Math.round((rightKeystroke/keystroke)*100)}%`;
    rightKeystrokes.innerHTML = `${rightKeystroke}`;
    wrongKeystrokes.innerHTML = `${wrongKeystroke}`;
    rightWords.innerHTML = `${rightWord}`;
    wrongWords.innerHTML = `${wrongWord}`;
    clearInterval(startTime);
    container.style.display = 'none';
    reportContainer.style.display = 'flex';
}

onload();
