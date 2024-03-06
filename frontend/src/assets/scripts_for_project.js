

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
