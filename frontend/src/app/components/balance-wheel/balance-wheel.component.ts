import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {wheel} from '../../data/wheel'
import {IWheel, IWheelData} from "../../interfaces/wheel";

@Component({
  selector: 'app-balance-wheel',
  // templateUrl: './balance-wheel.component.html',
  template: '<canvas #balanceWheelCanvas width="510" height="510"></canvas>',
  styleUrls: ['./balance-wheel.component.css']
})
export class BalanceWheelComponent implements OnInit {
  wheelData: IWheel[];
  @ViewChild('balanceWheelCanvas', { static: true }) balanceWheelCanvas: ElementRef<HTMLCanvasElement>;
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
    const radius = 200;
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
      innerRadius = innerRadius - radius/numCircles;
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
      this.ctx.beginPath();
      this.ctx.moveTo(centerX, centerY);
      this.ctx.lineTo(xOnOuterCircle, yOnOuterCircle);
      this.ctx.strokeStyle = 'black';
      this.ctx.stroke();


      // Добавить надпись из JSON файла
      const text = this.wheelData[i].name;

      // Рассчитать расстояние от круга, чтобы текст не заползал на круг
      const textRadius = radius + 20;

      // Рассчитать угол между символами
      const anglePerCharacter = (angleIncrement * 0.6) / text.length; // Множитель 0.8 для компактности

      for (let j = 0; j < text.length; j++) {
        const angle = currentAngle + j * anglePerCharacter;

        // Рассчитать координаты для каждого символа на дуге
        const x = centerX + Math.cos(angle) * textRadius;
        const y = centerY + Math.sin(angle) * textRadius;

        // Нарисовать символ
        this.ctx.font = '20px Shantell Sans cursiveSofia';
        this.ctx.fillStyle = 'black'; // Цвет текста
        this.ctx.textAlign = 'left';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(text[j], x, y);
      }



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
    }



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
  }
}
