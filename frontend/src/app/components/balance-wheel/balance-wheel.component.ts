import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {wheel} from '../../data/wheel'
import {IWheel, IWheelData} from "../../interfaces/wheel";

@Component({
  selector: 'app-balance-wheel',
  templateUrl: './balance-wheel.component.html',
  // template: '<canvas #balanceWheelCanvas width="510" height="510"></canvas>',
  styleUrls: ['./balance-wheel.component.css']
})
export class BalanceWheelComponent implements OnInit {
  wheelData: IWheel[];
  @ViewChild('balanceWheelCanvas', {static: true}) balanceWheelCanvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;

  ngOnInit() {
    // Присвойте данные колеса переменной wheelData
    this.wheelData = wheel.wheel;

    this.ctx = this.balanceWheelCanvas.nativeElement.getContext('2d');
    if (this.ctx) {
      this.drawCircle();
    }
  }


  drawCircle() {
    if (!this.ctx) {
      return;
    }

    // Получить количество элементов в массиве
    const numberOfElements = this.wheelData.length;
    const centerX = this.balanceWheelCanvas.nativeElement.width / 2;
    const centerY = this.balanceWheelCanvas.nativeElement.height / 2;
    const radius = 250;
    let innerRadius = radius;  // Радиус внутренних кругов
    const numCircles = 10;

    // Нарисовать внешний круг
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    this.ctx.lineWidth = 1;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();

    // Нарисовать внутренние круги
    for (let i = 0; i < numCircles; i++) {
      innerRadius = innerRadius - radius / numCircles;
      this.ctx.beginPath();
      this.ctx.arc(centerX, centerY, innerRadius, 0, 2 * Math.PI);
      this.ctx.lineWidth = 1;
      this.ctx.strokeStyle = 'black';
      this.ctx.stroke();
    }

    // Нарисовать точку в центре большого круга
    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, 2, 0, 2 * Math.PI); // Радиус 2 для точки
    this.ctx.fillStyle = 'black'; // Цвет точки
    this.ctx.fill();

    // Рисование n линий радиуса через равное расстояние
    const numberOfLines = numberOfElements; // Задайте желаемое количество линий
    const angleIncrement = (2 * Math.PI) / numberOfLines;

    // Угол для верхней части круга
    const startAngle = -Math.PI / 2;

    for (let i = 0; i < numberOfLines; i++) {
      const currentAngle = startAngle + i * angleIncrement;
      const xOnOuterCircle = centerX + Math.cos(currentAngle) * radius;
      const yOnOuterCircle = centerY + Math.sin(currentAngle) * radius;

      const currentAngle2 = startAngle + (i+1) * angleIncrement;
          
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(xOnOuterCircle, yOnOuterCircle);
      this.ctx.strokeStyle = 'black';
      this.ctx.stroke();


      // Раскраска сектора в соответствии с кол-вом заработанных баллов и выбранным цветом для каждой категории
      const fillRadX = centerX + Math.cos(currentAngle) * this.wheelData[i].points;
      const fillRadY = centerY + Math.sin(currentAngle) * this.wheelData[i].points;
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(fillRadX, fillRadY);
      this.ctx.arc(centerX, centerY, radius * this.wheelData[i].points/10, currentAngle, currentAngle2);
      this.ctx.moveTo(centerX, centerY);
      this.ctx.fillStyle = this.wheelData[i].color; // Цвет точки
      this.ctx.fill();   
      

      // Добавить надпись из JSON файла
      let text = this.wheelData[i].name;
      this.ctx.font = '20px Shantell Sans cursiveSofia';

      // Измерить ширину текста
      const textWidth = this.ctx.measureText(text).width;

      // Рассчитать расстояние от круга, чтобы текст не заползал на круг
      const textRadius = radius + 20;

      // Рассчитать угол между символами
      const anglePerCharacter = textWidth / text.length / textRadius;

      // Рассчитать координаты для центра текста на дуге внешнего круга
      const angleCenterText = currentAngle + ((currentAngle2 - currentAngle)/2);
      const centerXText = centerX + Math.cos(angleCenterText) * textRadius;
      const centerYText = centerY + Math.sin(angleCenterText) * textRadius;

      // Установить положение текста
      this.ctx.textAlign = 'center';
      this.ctx.textBaseline = 'middle';


      /*
      const fontSize = 20; // Размер шрифта
      const lineHeight = fontSize * 1.5; // Высота строки
      const padding = lineHeight * 0.5;  // Отступ сверху и снизу
      const width = this.ctx.measureText(text).width; // Ширина текста
      const height = lineHeight; // Высота текста   
      this.ctx.save();  // Сохраняем текущее состояние
      this.ctx.translate(centerXText, centerYText); // Переводим в систему координат текста
      //this.ctx.rotate(-startAngle); // Поворачиваем текст
      this.ctx.font = fontSize + 'px sans-serif';
      this.ctx.fillText(text, 0, lineHeight); // Рисуем текст
      this.ctx.restore(); // Восстанавливаем состояние после сохранения
      */
      console.log(`Угол: ${angleCenterText}`);
      if (angleCenterText > 0 && angleCenterText < Math.PI) {
        //Инвертируем текст ели он лежит от 0 до pi/2 (то есть внизу круга)
        let reverseString: string = "";
        // Iterating through the string
        for (let char of text) {

          // append every character of string to the start of the reverseString
          reverseString = char + reverseString;
        }
        text = reverseString
      }
    
      

      // В цикле по каждому символу в тексте
      for (let j = 0; j < text.length; j++) {
        // Рассчитать угол для текущего символа
        const k = text.length/2;
        const angle = angleCenterText + j * anglePerCharacter - anglePerCharacter*k;
        // Рассчитать координаты для каждого символа на дуге внешнего круга
        const x = centerX + Math.cos(angle) * textRadius;
        const y = centerY + Math.sin(angle) * textRadius;
        //console.log(`Угол: ${angle} символ ${text[j]}`);    
        // Нарисовать символ
        this.ctx.fillStyle = 'black'; // Цвет текста
        this.ctx.fillText(text[j], x, y);      
      }
  
      /*
      function formatAngle(angleRadians: number): string {
        const piFraction = angleRadians / Math.PI;
        const fraction = simplifyFraction({ numerator: piFraction, denominator: 1 });

        if (fraction.denominator === 1) {
          return fraction.numerator.toString();
        }

        return `${fraction.numerator}/${fraction.denominator} π`;
      }

      function simplifyFraction(fraction: { numerator: number; denominator: number }): { numerator: number; denominator: number } {
        const gcd = greatestCommonDivisor(fraction.numerator, fraction.denominator);
        return {
          numerator: fraction.numerator / gcd,
          denominator: fraction.denominator / gcd,
        };
      }

      function greatestCommonDivisor(a: number, b: number): number {
        return b === 0 ? a : greatestCommonDivisor(b, a % b);
      }

      // Выводим в консоль значения углов в формате "2/3 π"
      console.log(`Угол: ${formatAngle(currentAngle)}`);
*/
    }
  }
}

      // Добавить надпись из JSON файла
      // const text = this.wheelData[i].name;

      // Рассчитать расстояние от круга, чтобы текст не заползал на круг
      // const textRadius = radius + 20;

      // Рассчитать угол между символами
      // const anglePerCharacter = (angleIncrement * 0.6) / text.length; // Множитель 0.8 для компактности

      // for (let j = 0; j < text.length; j++) {
      //   const angle = currentAngle + j * anglePerCharacter;

        // Рассчитать координаты для каждого символа на дуге
        // const x = centerX + Math.cos(angle) * textRadius;
        // const y = centerY + Math.sin(angle) * textRadius;

        // Нарисовать символ
        // this.ctx.font = '20px Shantell Sans cursiveSofia';
        // this.ctx.fillStyle = 'black'; // Цвет текста
        // this.ctx.textAlign = 'left';
        // this.ctx.textBaseline = 'middle';
        // this.ctx.fillText(text[j], x, y);
      // }



      // Добавить надпись из JSON файла
      // const text = this.wheelData[i].name;

      // Рассчитать угол поворота для каждой буквы
      // const angleForText = currentAngle - Math.PI / 2; // Поворот на 90 градусов
      // const textWidth = this.ctx.measureText(text).width;

      // Рассчитать расстояние от круга, чтобы текст не заползал на круг
      // const textRadius = radius + 20;

      // Рассчитать координаты для текста
      // const xText = centerX + Math.cos(currentAngle) * textRadius;
      // const yText = centerY + Math.sin(currentAngle) * textRadius;

      // Нарисовать текст
      // this.ctx.save();
      // this.ctx.translate(xText, yText);
      // this.ctx.rotate(angleForText);
      // this.ctx.font = '20px Shantell Sans cursiveSofia';
      // this.ctx.fillStyle = 'black'; // Цвет текста
      // this.ctx.textAlign = 'center';
      // this.ctx.textBaseline = 'middle';
      // this.ctx.fillText(text, 0, 0);
      // this.ctx.restore();


      // этот код хорош но выше лучше
      // добавить надпись из JSON файла
      // const text = this.wheelData[i].name;
      // Измерить ширину текста
      // const textWidth = this.ctx.measureText(text).width;
      // Рассчитать расстояние от круга, чтобы текст не заползал на круг
      // const textRadius = radius + 20 + textWidth / 3; // Добавлено половина ширины текста
      // const xText = centerX + Math.cos(currentAngle) * textRadius;
      // const yText = centerY + Math.sin(currentAngle) * textRadius;
      //
      // this.ctx.font = '20px Shantell Sans cursiveSofia';
      // this.ctx.fillStyle = 'black'; // Цвет текста
      // this.ctx.textAlign = 'center';
      // this.ctx.textBaseline = 'middle';
      // this.ctx.fillText(text, xText, yText);




    // Можно делать текст по кругу. Надо ли?
    // Нарисовать текст вдоль дуги внешнего круга
    // const text = 'Ваш текст';
    // this.ctx.font = '14px Arial'; // Установить шрифт и размер
    // this.ctx.textAlign = 'center';
    // this.ctx.textBaseline = 'middle';
    //
    // const startAngle = Math.PI; // Начальный угол для дуги (в радианах)
    // const endAngle = Math.PI / 2; // Конечный угол для дуги (в радианах)
    //
    // Рассчитать угол между символами
    // const anglePerCharacter = (endAngle - startAngle) / (text.length - 1);
    //
    // for (let i = 0; i < text.length; i++) {
    //   const angle = startAngle + i * anglePerCharacter;
    //
    //   Рассчитать координаты для каждого символа на дуге
      // const x = centerX + Math.cos(angle) * (radius + 10); // Добавлено расстояние от круга
      // const y = centerY + Math.sin(angle) * (radius + 10);
      //
      // Нарисовать символ
      // this.ctx.fillStyle = 'black';
      // this.ctx.fillText(text[i], x, y);
    // }
