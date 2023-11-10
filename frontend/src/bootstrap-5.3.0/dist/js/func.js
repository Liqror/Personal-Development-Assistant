/**
 * Находит максимальный элемент в последовательности
 * @param {Array} array исходный массив
 * @returns максимальный элемент
 */
function findMax(array) {
  let max = 0;
  max = Math.max.apply(null, array);
  return max;
}


/**
 * Вычисляет кол-во максимальных элементов в последовательности
 * @param {Array} array исходный массив
 * @returns кол-во максимальных элементов
 */
function calcMaxCount(array) {
  let count_max = 0;
  for(let item of array) {
    if (item === findMax(array)) {
      count_max++;
    }
  }
  return count_max;
}


/**
 * Вычисляет  максимальный из модулей элементов последовательности
 * @param {Array} array исходный массив
 * @returns элемент последовательности максимальный по модулю
 */
function calcMaxABS(array) {
  num_abs = array.map(Math.abs);
  max_abs = findMax(num_abs);
  return max_abs;
}


/**
 * Вычисляет  максимальный из модулей элементов последовательности
 * @param {Array} array исходный массив
 * @returns элемент последовательности максимальный по модулю
 */
function calcCountNull(array) {
  //let num = 0;
  let count_null = 0;
  for(let item of array) {
    if (item === 0) {
      count_null++;
    }
  }
  return count_null;
}



let inpSequenceTag = document.getElementById("inp-seq")
let inpCalc1 = document.getElementById("inp-solve-text-1")
let inpCalc2 = document.getElementById("inp-solve-text-2")
let inpCalc3 = document.getElementById("inp-solve-text-3")

inpSequenceTag.addEventListener("keyup", () => {
  inpSeq = inpSequenceTag.value.split(" ").filter((x) => (x !== "")).map(Number)
  if (inpSeq.filter(x => isNaN(x)).length > 0) {
    inpCalc1.innerText = "Некорректная последовательность"
    inpCalc2.innerText = "Некорректная последовательность"
    inpCalc3.innerText = "Некорректная последовательность"
  } else {
    if (inpSeq.length !== 0) {
      inpCalc1.innerText = calcMaxCount(inpSeq)
      inpCalc2.innerText = calcMaxABS(inpSeq)
      inpCalc3.innerText = calcCountNull(inpSeq)
    }
  }
})
