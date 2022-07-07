/*
 * Welcome to your app's main JavaScript file!
 *
 * We recommend including the built version of this JavaScript file
 * (and its CSS file) in your base layout (base.html.twig).
 */

// any CSS you import will output into a single css file (app.css in this case)
import './styles/app.css';

// start the Stimulus application
import './bootstrap';

document.addEventListener('DOMContentLoaded', function () {

    let check_button = document.querySelectorAll('.check_answer');
    let next_butt = document.querySelectorAll('#next_butt');
    let user_answer_input = document.querySelectorAll('#user-answer');

    user_answer_input.forEach(input => {
        input.addEventListener('keypress',function (event) {
            if (event.keyCode === 13) {
                event.preventDefault();
            }
        });
    })

    check_button.forEach(function (button) {
        button.addEventListener('click', function checkAnswer() {

            let user_answer = button.parentElement.querySelector('#user-answer').value;
            let user_input = button.parentElement.querySelector('#user-answer');

            if (user_answer.charAt(0) !== user_answer.charAt(0).toUpperCase()) {
                user_input.setCustomValidity("Proszę wpisać z dużej litery");
                user_input.reportValidity();
                return false;
            } else {
                user_input.setCustomValidity("");
            }

            let correct_answer = button.parentElement.querySelector('#correct-answer');
            let correct_butt = button.parentElement.querySelector('#correct_butt');
            let not_correct_butt = button.parentElement.querySelector('#not_correct_butt');
            let next_butt = button.parentElement.querySelector('#next_butt');

            let correct_answers_counter = document.getElementById("correct_answers_counter");
            let bad_answers_counter = document.getElementById("bad_answers_counter");

            if (user_answer !== correct_answer.innerHTML) {
                bad_answers_counter.value++;
                document.getElementById("bad_answers_counter").value = bad_answers_counter.value;
                correct_answer.hidden = false;
                not_correct_butt.hidden = false;
                not_correct_butt.classList.add('active_question');
                if (next_butt){
                    next_butt.hidden = false;
                }
            } else {
                correct_answers_counter.value++;
                document.getElementById("correct_answers_counter").value = correct_answers_counter.value;
                correct_answer.hidden = false;
                correct_butt.hidden = false;
                if (next_butt){
                    next_butt.hidden = false;
                }
            }

            let form = button.parentElement.querySelector("#summary_form");
            if (form) {
                setTimeout("document.results.submit();",1500);
            }

        })

    })

    next_butt.forEach(next_button => {
        next_button.addEventListener('click', function () {
            let actual_question = next_button.parentElement;
            let next_question = actual_question.nextElementSibling;
            actual_question.classList.remove("active_question");
            actual_question.classList.add("hidden");
            next_question.classList.remove("hidden");
            next_question.classList.add("active_question");

        });
    })


    jSuites.calendar(document.getElementById('calendar'), {
        time:true,
        format:'DD/MM/YYYY HH24:MI',
        onchange: function(instance, picked_date) {
            let from_date = document.getElementById('from_date').innerText = picked_date;
            let all_dates = document.querySelectorAll('#date');
            all_dates.forEach(date_td =>{
                let until_date = document.getElementById('until_date').innerText;
                if (until_date) {
                    if (date_td.innerHTML > picked_date && date_td.innerHTML < until_date ) {
                        date_td.parentElement.classList.add('active_row');
                    } else {
                        date_td.parentElement.classList.remove('active_row');
                        date_td.parentElement.classList.add('hidden');
                    }
                } else {
                    if (date_td.innerHTML > picked_date) {
                        date_td.parentElement.classList.add('active_row');
                    } else {
                        date_td.parentElement.classList.remove('active_row');
                        date_td.parentElement.classList.add('hidden');
                    }
                }
            })
        }
    });
    jSuites.calendar(document.getElementById('calendar2'), {
        time:true,
        format:'DD/MM/YYYY HH24:MI',
        onchange: function(instance, picked_date) {
            document.getElementById('until_date').innerText = picked_date;
            let all_dates = document.querySelectorAll('#date');
            all_dates.forEach(date_td =>{
                let from_date = document.getElementById('from_date').innerText;
                if ( date_td.innerHTML < picked_date && date_td.innerHTML > from_date) {
                    date_td.parentElement.classList.add('active_row');
                } else {
                    date_td.parentElement.classList.remove('active_row');
                    date_td.parentElement.classList.add('hidden');
                }
            })
        }

    }
    );


});
