

(function() {
  const headings = document.querySelectorAll('h5');

  Array.prototype.forEach.call(headings, h => {
    let btn = h.querySelector('button');
    let target = h.nextElementSibling;

    btn.onclick = () => {
      let expanded = btn.getAttribute('aria-expanded') === 'true';
      /*document.querySelector('.col-md-9').style.backgroundColor = '#f0f0f0';*/

      btn.setAttribute('aria-expanded', !expanded);
      target.hidden = expanded;
    }
  });
})()
function showDiv() {
  document.getElementById("div1").style.display = "block";
}

function hideDiv() {
  document.getElementById("div1").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("close-button").addEventListener("click", hideDiv);
});


function toggle() {
  var div = document.getElementById('pnlTest');
  if(this.checked)
    div.style.display = 'block';
  else
    div.style.display = 'none'
}
document.getElementById('chkTest').onchange = toggle;

(function() {
const buttons = document.querySelectorAll(".clickable");

// Привязываем обработчик событий к каждой кнопке
for (let i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    // Проверяем значение css переменной
    if (this.classList.contains("clicked")) {
      // Если переменная равна 1, то сбрасываем ее
      this.style.setProperty("--clicked", "0");
    } else {
      // Иначе устанавливаем значение в 1
      this.style.setProperty(
        "--clicked",
        "1"
      );
    }
    // Добавляем или удаляем класс "clicked"
    this.classList.toggle("clicked");
  });
}
})()



function showDivPlan() {
  document.getElementById("divPlan").style.display = "block";
}

function hideDivPlan() {
  document.getElementById("divPlan").style.display = "none";
}

document.addEventListener("DOMContentLoaded", function() {
  document.getElementById("close-button").addEventListener("click", hideDivPlan);
})

function deleteElement(elem) {
  elem.parentNode.innerHTML = '';
}


function deletePlan(planElement) {
  planElement.remove();
}

function weeksSettingDiv() {
  document.getElementById("divWeek").style.display = "block";
}


function delTimetable() {
  document.querySelectorAll('.myTable').forEach(table => {
    while (table.firstChild) {
      table.removeChild(table.firstChild);
    }
  });
  document.getElementById("divWeek").style.display = "none";
}

function hideSetDiv() {
  document.getElementById("divWeek").style.display = "none";
}

function showDivNewCtg() {
  document.getElementById("newCtg").style.display = "block";
}

function hideDivCtg() {
  document.getElementById("newCtg").style.display = "none";
}






  
  

/*
function checkInput(e) {
  console.log('Кнопка сохранения задачи нажата');
  log.textContent = e.target.taskName;
}
*/

/*
Проверка вводимых данных для окна создания задачи
*/
function checkInput() {
    let text = document.getElementById("taskName").value;
    let est = document.getElementById("mark_task").value;
    //console.log(text, "   ", est);
  
    let date_from = document.getElementById("date_from").value;
    let time_from = document.getElementById("time_from").value;
    let date_to = document.getElementById("date_to").value;
    let time_to = document.getElementById("time_to").value;
    console.log(date_from, "   ", time_from, " ", date_to, "", time_to);
  
  
    //  Проверка оценки задачи на принадлежность диапазону от 1 до 100
    if (est >= 1 && est <= 100) {
      console.log(est, "В нужном диапазоне, все ок");
      document.getElementById("checkEstimate").innerHTML = "";
    }
    else {
      console.log(est, "Выход за границу [1,100]!!!");
      document.getElementById("checkEstimate").innerHTML = "Оценка задачи должна быть в диапазоне [1,100]";
    }
  
    //  Проверка на введенность названия задачи
    if (text == "") {
      console.log(text, "Пустой текст, ничего не введено!");
      document.getElementById("checkTaskName").innerHTML = "Вы не ввели название задачи! ";
    }
    else {
      console.log(text, "Вроде ок");
      document.getElementById("checkTaskName").innerHTML = "";
    }
  
    /* Проверка выбранного времени и даты. Задача не должна сохраняться, если
    1) Введено время, но не введена дата
    2) Дата начала больше даты конца
    */
    if ((date_from > date_to && date_to != "") || (date_from == "" && time_from != "") || (date_to == "" && time_to != "")) {
      console.log(text, "Время для задачи указано с ошибками!");
      document.getElementById("checkDateTime").innerHTML = "Время для задачи указано не корректно! ";
    }
    else {
      console.log(text, "Вроде ок");
      document.getElementById("checkDateTime").innerHTML = "";
    }
    
}
document.getElementById("save-button-task").click = checkInput;

/*
Проверка вводимых данных для окна создания плана
*/
function checkInputForPlan() {
  console.log("HERE?!");
  let namePlan = document.getElementById("newNamePlan").value;
  let date_from = document.getElementById("datePlan_from").value;
  let date_to = document.getElementById("datePlan_to").value;

  console.log(date_from, "   ", date_to);

  //  Проверка на введенность названия плана
  if (namePlan == "") {
    console.log("Пустой текст, ничего не введено!");
    document.getElementById("checkPlanName").innerHTML = "Вы не ввели название плана! ";
  }
  else {
    console.log("Вроде ок");
    document.getElementById("checkPlanName").innerHTML = "";
  }

  /* Проверка введенной даты для плана. 
     План не может сохраняться, если дата начала 
     наступает позже даты окончания плана.
  */
  if (date_from > date_to && date_to != "") {
    console.log("Дата начала не может быть больше даты окончания!");
    document.getElementById("checkDatePlan").innerHTML = "Дата начала не может быть больше даты окончания! ";
  }
  else {
    console.log("Вроде ок");
    document.getElementById("checkDatePlan").innerHTML = "";
  }
}
document.getElementById("save-button-plan").click = checkInputForPlan;


