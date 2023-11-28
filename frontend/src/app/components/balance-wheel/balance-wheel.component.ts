// balance-wheel.component.ts

import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-balance-wheel',
  templateUrl: './balance-wheel.component.html',
  styleUrls: ['./balance-wheel.component.css']
})
export class BalanceWheelComponent implements OnInit {
  @ViewChild('balanceWheelCanvas', { static: true }) balanceWheelCanvas: ElementRef<HTMLCanvasElement>;
  private ctx: CanvasRenderingContext2D | null = null;

  ngOnInit() {
    this.ctx = this.balanceWheelCanvas.nativeElement.getContext('2d');
    if (this.ctx) {
      this.drawBalanceWheel();
    }
  }

  drawBalanceWheel() {
    if (!this.ctx) {
      return;
    }

    const centerX = this.balanceWheelCanvas.nativeElement.width / 2;
    const centerY = this.balanceWheelCanvas.nativeElement.height / 2;
    const radius = 100;

    this.ctx.beginPath();
    this.ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    this.ctx.fillStyle = 'lightgray';
    this.ctx.fill();
    this.ctx.lineWidth = 2;
    this.ctx.strokeStyle = 'black';
    this.ctx.stroke();
  }
}
