let quizContainer = document.getElementById("quiz-container");
let selectedAnswers = {};
let question;
let index;

const generateStory = () => {
    let stories = ``;
    for (let i = 0; i < question.story.length; i++) {
        let story = question.story[i];
       
        stories += `<p class="each-story">

        ${story}
        </p>`;
    }
    return stories;
}
const generateOptions = () => {
    let options = ``;
    for (let i = 0; i < question.options.length; i++) {
        let option = question.options[i];
        let selected = false;
        if(selectedAnswers[`${question.question}`] == option){
            selected = true;
        }
        options += `<div class="each-answer">
        <input type="radio" name="answer-btn" id="${option}" ${selected ? "checked='true'" : ""} onclick="addAnswer()" value="${option}">
        <label for="${option}">${option}</label>
        </div>`;
    }
    return options;
}

/*const generateJumpBtns = ()=>{
//    let btns = ``;
 //   for(let i = 0; i < questions.length; i++){
        btns += `<button class="jumper-button ${i == index ? "active" : ""}" onclick="showQuestion(${i})">${i + 1}</button>`;
    }
    return btns;
} */

const addAnswer = ()=>{
    let currentOptions = document.getElementsByName("answer-btn");
    for(let i = 0; i < currentOptions.length; i++){
        let currentOption = currentOptions[i];
        if(currentOption.checked == true){
            selectedAnswers[`${question.question}`] = currentOption.value;
        }
    }
}

const restartQuiz = ()=>{
    index = 0;
    selectedAnswers = {};
    showQuestion(0);
}

const submitQuiz = ()=>{
    let message = `Estas seguro que quieres calificar el examen`;
    let answered = Object.keys(selectedAnswers);
    if(answered.length < questions.length){
        message += `\nTienes ${questions.length - answered.length} preguntas de ${questions.length} sin contestar`;
    }
    let ask = confirm(message);
    let attempted = 0;
    let correct = 0;
    let wrong = 0;
    if(ask){
        for(let i = 0; i < questions.length; i++){
            let question = questions[i];
            if(selectedAnswers[`${question.question}`] != undefined){
                attempted++;
                if(selectedAnswers[`${question.question}`] == question.answer){
                    correct++;
                }else{
                    wrong++;
                }
            }
        }
        porcentage = (correct/questions.length)*100
        quizContainer.innerHTML = `<div class="result-wrapper">
        <h3>Resultados</h3>
        <div class="result-details">
            <div>
                <div>Contestadas</div>
                <input type="text" name="Contestadas" value="${attempted} de ${questions.length}">
            </div>
            <div>
                <div>Incorrectas</div>
                <input type="text" name="Incorrectas" value="${wrong}">
            </div>
            <div>
                <div>Correctas</div>
                <input type="text" name="Correctas" value="${correct}">
            </div>
            <div>
                <div>Porcentaje</div>
                <input type="text" name="Porcentaje" value="${porcentage}%">
            </div>
        </div>
        <button class="jumper-button" onclick="restartQuiz()">Reiniciar</button>
    </div>`;
    }
}

const showQuestion = (i) => {
    index = i;
    if (questions[index]) {
        question = questions[index];
        let stories = generateStory(index);
        let options = generateOptions(index);
        //let jumpBtns = generateJumpBtns(index);


        quizContainer.innerHTML = `
        <div class="action-btns">
        ${index > 0 ? `<button class="prev-next" onclick="showQuestion(${index - 1})">Anterior</button>` : ""}
        ${index < questions.length - 1 ? `<button class="prev-next" onclick="showQuestion(${index + 1})">Siguiente</button>` : ""}
        <button class="prev-next" style="background-color : red;" onclick="submitQuiz()">Calificar</button>
    </div>
            <div class="pointer-container">
                <h3>
                    Pregunta ${index + 1} de ${questions.length}
                </h3>
            </div>
            <div id="story">
           <pre> ${stories} </pre>
            </div>
            
            <div id="question">
                ${question.question}
            </div>
            <div class="answers-container">
                ${options}
            </div>
            <div class="action-btns">
                ${index > 0 ? `<button class="prev-next" onclick="showQuestion(${index - 1})">Anterior</button>` : ""}
                ${index < questions.length - 1 ? `<button class="prev-next" onclick="showQuestion(${index + 1})">Siguiente</button>` : ""}
                <button type="submit" class="prev-next" style="background-color : red;" onclick="submitQuiz()">Calificar</button>
            </div>`
        ;
    } else {
        alert("Invalid question");
    }
}

showQuestion(0)
