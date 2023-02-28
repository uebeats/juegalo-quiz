const quiz_box = document.querySelector(".quiz_box");
const result_box = document.querySelector(".result_box");
const option_prize = document.querySelector(".optionprize_box");
const option_list = document.querySelector(".option_list");

showQuetions(0); //calling showQestions function
let que_count = 0;
let que_numb = 1;
let userScore = 0;
const next_btn = document.querySelector(".next_btn");
const bottom_ques_counter = document.querySelector(".total_que");
let resultBtn = document.querySelector(".final_btn a");
let anchorPrizeBet = document.querySelector(".optionBet #btnBet");
let anchorPrizeCasino = document.querySelector(".optionBet #btnCasino");

// if Next Que button clicked
next_btn.onclick = () => {
    if (que_count < questions.length - 1) { //if question count is less than total question length
        que_count++; //increment the que_count value
        que_numb++; //increment the que_numb value
        showQuetions(que_count); //calling showQestions function
        queCounter(que_numb); //passing que_numb value to queCounter
        next_btn.classList.remove("show"); //hide the next button
    } else {
        showResult(); //calling showResult function
    }
}
queCounter(1); //passing 1 parameter to queCounter

// getting questions and options from array
function showQuetions(index) {
    const que_text = document.querySelector(".que_text");
    //creating a new span and div tag for question and option and passing the value using array index
    let que_tag = `<p><span>${questions[index].numb}</span></p><h4>${questions[index].question}</h4>`;
    let option_tag =
        `<div class="option"><span>${questions[index].options[0]}</span></div>
    <div class="option"><span>${questions[index].options[1]}</span></div>
    <div class="option"><span>${questions[index].options[2]}</span></div>`;
    que_text.innerHTML = que_tag; //adding new span tag inside que_tag
    option_list.innerHTML = option_tag; //adding new div tag inside option_tag

    const option = option_list.querySelectorAll(".option");
    // set onclick attribute to all available options
    for (i = 0; i < option.length; i++) {
        option[i].setAttribute("onclick", "optionSelected(this)");
    }
}
// creating the new div tags which for icons
let tickIconTag = '<div class="icon tick"><i class="fas fa-check"></i></div>';
let crossIconTag = '<div class="icon cross"><i class="fas fa-times"></i></div>';

//if user clicked on option
function optionSelected(answer) {
    let userAns = answer.textContent; //getting user selected option
    let correcAns = questions[que_count].answer; //getting correct answer from array
    const allOptions = option_list.children.length; //getting all option items

    if (userAns == correcAns) { //if user selected option is equal to array's correct answer
        userScore += 1; //upgrading score value with 1
        answer.classList.add("correct"); //adding green color to correct selected option
        answer.insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to correct selected option
        // console.log("Correct Answer");
        // console.log("Your correct answers = " + userScore);
    } else {
        answer.classList.add("incorrect"); //adding red color to correct selected option
        answer.insertAdjacentHTML("beforeend", crossIconTag); //adding cross icon to correct selected option
        // console.log("Wrong Answer");
        for (i = 0; i < allOptions; i++) {
            if (option_list.children[i].textContent == correcAns) { //if there is an option which is matched to an array answer 
                option_list.children[i].setAttribute("class", "option correct"); //adding green color to matched option
                option_list.children[i].insertAdjacentHTML("beforeend", tickIconTag); //adding tick icon to matched option
                // console.log("Auto selected correct answer.");
            }
        }
    }
    for (i = 0; i < allOptions; i++) {
        option_list.children[i].classList.add("disabled"); //once user select an option then disabled all options
    }
    next_btn.classList.add("show"); //show the next button if user selected any option
}

function showResult() {
    quiz_box.classList.remove("activeQuiz"); //hide quiz box
    result_box.classList.add("activeResult"); //show result box
    resultBtn.onclick = () => {

        result_box.classList.remove("activeResult");
        option_prize.classList.add("activeOptions");

        let urlPrizeBet = '#fakelink'; // set attribute in anchor html of prize bet
        anchorPrizeBet.setAttribute('href', urlPrizeBet);

        let urlPrizeCasino = '#fakelink'; // set attribute in anchor html of prize casino
        anchorPrizeCasino.setAttribute('href', urlPrizeCasino);
    }
}

function queCounter(index) {
    //creating a new span tag and passing the question number and total question
    let totalQueCounTag = `<span><p>${index}</p> de <p>${questions.length}</p> preguntas</span>`;
    bottom_ques_counter.innerHTML = totalQueCounTag;  //adding new span tag inside bottom_ques_counter
}

/* COUNTDOWN */
let countDownDate = new Date("Jul 25, 2023 00:00:00").getTime();
let timerCountDown = setInterval(function () {

    let now = new Date().getTime();
    let timeleft = countDownDate - now;

    let horas = Math.floor((timeleft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    let minutos = Math.floor((timeleft % (1000 * 60 * 60)) / (1000 * 60));
    let segundos = Math.floor((timeleft % (1000 * 60)) / 1000);

    if (horas < 10) { horas = "0" + horas; }
    if (minutos < 10) { minutos = "0" + minutos; }
    if (segundos < 10) { segundos = "0" + segundos; }

    document.getElementById("horas").innerHTML = horas;
    document.getElementById("mins").innerHTML = minutos;
    document.getElementById("segs").innerHTML = segundos;

}, 1000)