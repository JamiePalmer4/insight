/*--Questions being asked--*/
const visionTestQuestions = [
    {
        question: "1. Has there been any changes in your vision lately, such as blurriness of vision or lack of focus?",
        answers: ["Definitely Agree", "Agree", "Disagree", "Definitely Disagree"],
    },
    {
        question: "2. Are you having any problems with viewing objects up close?",
        answers: ["Definitely Agree", "Agree", "Disagree", "Definitely Disagree"],
    },
    {
        question: "3. Has there been difficulties when adjusting your eyes to different lighting, such as bright lights or issues with vision in a very dim light?",
        answers: ["Definitely Agree", "Agree", "Disagree", "Definitely Disagree"],
    },
    {
        question: "4. Have you encountered any changes with the health of your eyes, such as irritation, dryness, or redness around the surrounding area?",
        answers: ["Definitely Agree", "Agree", "Disagree", "Definitely Disagree"],
    },
    {
        question: "5. Do you have issues with viewing specific colours, or get mixed up between different colours?",
        answers: ["Definitely Agree", "Agree", "Disagree", "Definitely Disagree"],
    },
    {
        question: "6. Do you struggle viewing objects which are of long distance from yourself?",
        answers: ["Definitely Agree", "Agree", "Disagree", "Definitely Disagree"],
    },
    {
        question: "7. Have you struggled with viewing text displayed in books, newspapers, or electronic devices?",
        answers: ["Definitely Agree", "Agree", "Disagree", "Definitely Disagree"],
    },
    {
        question: "8. Are you experiencing any pain or soreness around the eye area?",
        answers: ["Definitely Agree", "Agree", "Disagree", "Definitely Disagree"],
    },
    {
        question: "9. Do you suffer from headaches or migraines in relation to your vision?",
        answers: ["Definitely Agree", "Agree", "Disagree", "Definitely Disagree"],
    },
    {
        question: "10. Do you belive you require an eye appointment with the opticians to gain a better understanding of your vision?",
        answers: ["Definitely Agree", "Agree", "Disagree", "Definitely Disagree"],
    },
    
];

let responses = [];


/*--Link to main document through ID--*/
const questionName = document.getElementById('question-name');
const answerOptions = document.getElementById('answer-options');
const assessmentResult = document.getElementById('assessment-result');
const startButton = document.getElementById('start-button');


/*--Function which starts the test, displaying the Quiz Container and hiding the others--*/
function startTest() {
    document.getElementById('start-container').style.display = 'none';
    document.getElementById('assistance-container').style.display = 'none';
    document.getElementById('quiz-container').style.display = 'block';
    loadQuestion();
}


/*--Function which displays the Question and provides the button for users to answer--*/
function loadQuestion() {
    const currentQuestionData = visionTestQuestions[responses.length];
    if (currentQuestionData) {
        questionName.innerText = currentQuestionData.question;
        answerOptions.innerHTML = '';

        /*--Button Options--*/
        currentQuestionData.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.textContent = answer;
            button.className = 'answer-button';
            button.setAttribute('onclick', `collectAnswer(${index})`);
            answerOptions.appendChild(button);
        });
    } else {
        showResult();
    }
}
/*--Function which collects the answer and loads the next question--*/
function collectAnswer(answerIndex) {
    responses.push(answerIndex);
    loadQuestion();
}


/*--Function which shows the results page, along with the original box displayed at the start--*/
function showResult() {
    document.getElementById('quiz-container').style.display = 'none';
    document.getElementById('assistance-container').style.display = 'block';
    document.getElementById('result-container').style.display = 'block';

    let recommendation = analysisOfAnswer();
    assessmentResult.textContent = recommendation;
}
/*--Function which starts the answer totals at 0--*/
function analysisOfAnswer() {
    let analysis = {
        definitelyAgree: 0,
        agree: 0,
        disagree: 0,
        definitelyDisagree: 0
    };

    /*--If the answer equates to one of the options, it adds one onto that answer e.g. if answer was agree then the answer total for agree would plus 1--*/
    responses.forEach(answer => {
        if (answer === 0) {
            analysis.definitelyAgree++;
        } else if (answer === 1) {
            analysis.agree++;
        } else if (answer === 2) {
            analysis.disagree++;
        } else if (answer === 3) {
            analysis.definitelyDisagree++;
        }
    });

    /*--Collects the total scores and based upon the score, gives a recommendation to the user whether it may be important to go see an optician, or if there vision is fine and there is no need to go--*/
    let recommendation = '';
    if (analysis.definitelyAgree >= 7 || analysis.agree >= 8) {
        recommendation = "As this is not a formal diagnosis, based on your responses, it may be important to organise an appointment with your nearest opticians to perform a clinical diagnosis. Undergoing a professional examination can offer a comprehensive evaluation about your visual health, and provide recommendations to improve your vision.";
    } else if (analysis.definitelyDisagree >= 7 || analysis.disagree >= 6) {
        recommendation = "As this is not a formal diagnosis, based on your responses, your vision seems okay. However, if you feel an appointment to your local optician is needed then you should consider scheduling an appointment. They can offer a clinical assessment and address any issues which may be effecting your eye sight, and gives you the opportunity to ask further questions with a registered optician. ";
    } else {
        recommendation = "As this is not a formal diagnosis, based on your responses, you should consider making an appointment with your nearest optician. This way you can undergo a full examination completed by a trusted professional, who can identify any underlying issues which you may not be aware of.";
    }

    return recommendation;
}

loadQuestion();