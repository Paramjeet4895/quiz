var curques = 1;
let score = 0;
var ansarr = [];
let average;
let percentage;
let qus;
(function myQues() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (xhttp.readyState == 4 && xhttp.status == 200) {
            qus = JSON.parse(xhttp.response);

        }

    }

    /////////////START AND RESTART QUIZ///////////////////////////
    /////////////////////////////////////////////////////////////
    document.querySelector('.btn-start').addEventListener('click', () => {
        curques = 1;
        ansarr = [];
        score = 0;
        document.querySelector('.average').style.display = "none";
        document.querySelector('#quizArea').style.display = 'block';
        document.querySelector('.heading').style.display = "none";
        document.querySelector('.btn-start').style.display = "none";
        document.querySelector('.btn-result').style.display = "none";
        document.querySelector('.btn-submit').style.display = "block";
        nextQuestion();

    });

    document.querySelector('#next').addEventListener('click', function (c) {
        curques++;
        nextQuestion();

    })
    document.querySelector('#pre').addEventListener('click', function (c) {
        curques--;
        nextQuestion();

    })

    let qusNo = (function () {
        return function ques() {
            for (i in qus) {
                if (qus[i].questionId == curques) {
                    return i;
                }
            }
        }

    })();

    ///////////////////////PAGINATION////////////////////////////
    /////////////////////////////////////////////////////////////
    function pagination() {
        if (curques == 1) {
            document.querySelector('#pre').style.display = "none";
            document.querySelector('#next').style.display = "block";
        } else if (curques == 10) {
            document.querySelector('#next').style.display = "none";
            document.querySelector('.btn-result').style.display = "block";
            document.querySelector('.btn-submit').style.display = "none";
        } else {
            document.querySelector('#pre').style.display = "block";
            document.querySelector('#next').style.display = "block";
        }
    }


    /////////////////////READ QUESTION///////////////////////////
    /////////////////////////////////////////////////////////////
    function nextQuestion() {
        pagination();
        let cqno = qusNo();
        document.querySelector('.answer').style.display = "none";
        document.querySelector('#question').textContent = `${qus[cqno].questionDescription}`;
        var k = 0;
        for (j of qus[cqno].options) {
            document.querySelectorAll('.option')[k].textContent = `${j}`;
            k += 1;
        }

        var radList = document.getElementsByName('option');
        if (ansarr[curques] == "A") {
            radList[0].checked = true;
        }
        else if (ansarr[curques] == "B") {
            radList[1].checked = true;
        }
        else if (ansarr[curques] == "C") {
            radList[2].checked = true;
        }
        else if (ansarr[curques] == "D") {
            radList[3].checked = true;
        }
        else {
            for (var i = 0; i < radList.length; i++) {
                radList[i].checked = false;
            }

        }


    }


    ///////////////////////SUBMIT QUIZ///////////////////////////
    /////////////////////////////////////////////////////////////
    document.querySelector('.btn-submit').addEventListener('click', () => {
        let cqno = qusNo();
        if (document.querySelector('input[name = "option"]:checked') != undefined) {
            var userans = document.querySelector('input[name = "option"]:checked').value;
            ansarr[curques] = userans;

            document.querySelector('.answer').style.display = "block";
            document.querySelector('.answer').textContent = `${userans} submitted..!`;
            if (`${qus[cqno].coranswer}` == userans) {
                score++;
                document.querySelector('.answer').style.display = "block";
                document.querySelector('.answer').textContent = `${userans} submitted..!`;
            }
        } else {
            alert("Please select an Option");
        }



    });



    /////////////////////////RESULT//////////////////////////////
    /////////////////////////////////////////////////////////////
    document.querySelector('.btn-result').addEventListener('click', () => {
        document.getElementById('quizArea').style.display = "none";
        document.querySelector('.heading').style.display = "block";
        document.querySelector('.btn-start').style.display = "block";
        document.querySelector('.average').style.display = "block";


        var promise = new Promise(function (resolve, reject) {
            average = score / 10;
            percentage = average * 100;
            if (percentage >= 60) {
                resolve();
            } else {
                reject();
            }
        });

        promise.
            then(function () {
                document.querySelector('.heading').textContent = `Total Questions:10 ;  Correct Answer:${score}`;
                document.querySelector('.average').textContent = `Congratulations.!! You Score:${percentage}%`;
                document.querySelector('.btn-start').value = "START AGAIN"

            }).
            catch(function () {
                document.querySelector('.heading').textContent = `Total Questions:10 ;  Correct Answer:${score}`;
                document.querySelector('.average').textContent = `Whoops..! You failed`;
                document.querySelector('.btn-start').value = "TRY AGAIN"
            });

    });

    xhttp.open("GET", "questions.json", true);
    xhttp.send();
})();


