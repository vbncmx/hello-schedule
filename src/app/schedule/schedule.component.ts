import { Component, OnInit, ElementRef } from '@angular/core';
import { Event } from '../event';
import { EVENTS } from '../event-provider';
import { EventComponent } from '../event/event.component';
import { ScheduleOptions } from '../scheduleOptions';
import * as $ from 'jquery';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  year: 2018;
  month: 1;
  events: Event[];

  ngOnInit() {
    this.year = 2018;
    this.month = 1;
    this.events = EVENTS.filter(e => e.start.getFullYear() === this.year && e.start.getMonth() === this.month);
  }

  constructor(el: ElementRef) {
    const that = this;
    $(function () {
      const scheduleGrid = document.getElementById('scheduleGrid');
      that.adjustStyle(scheduleGrid.style);
    });
  }

  private adjustStyle(style) {
    const so = ScheduleOptions.Current();
    const minutesFromScheduleStart = 24 * 60 - so.scheduleStartMinutes;
    const height = this.toPx(so.dayHeightPx * 31);
    const width = this.toPx(so.stepPx * minutesFromScheduleStart / so.stepMinutes);

    const gradientHeight1 = this.toPx(so.dayHeightPx - so.gridLineThicknessPx);
    const gradientHeight2 = this.toPx(so.dayHeightPx);
    const heightGradient = 'repeating-linear-gradient(0deg, transparent, transparent {gradientHeight1}, #CCC {gradientHeight1}, #CCC {gradientHeight2})'
      .replace(/{gradientHeight1}/g, gradientHeight1)
      .replace(/{gradientHeight2}/g, gradientHeight2);

    const gradientWidth1 = this.toPx(so.hourWidthPx - so.gridLineThicknessPx);
    const gradientWidth2 = this.toPx(so.hourWidthPx);
    const widthGradient = 'repeating-linear-gradient(90deg, transparent, transparent {gradientWidth1}, #CCC {gradientWidth1}, #CCC {gradientWidth2})'
      .replace(/{gradientWidth1}/g, gradientWidth1)
      .replace(/{gradientWidth2}/g, gradientWidth2);

    const backgroundImage = heightGradient + ', ' + widthGradient;
    console.log(backgroundImage);

    const backgroundSize = this.toPx(so.hourWidthPx) + ' ' + this.toPx(so.dayHeightPx);

    style.position = 'relative';
    style.height = height;
    style.width = width;
    style.backgroundImage = backgroundImage;
    style.backgroundSize = backgroundSize;

    // return "position: relative; height: ${height}; width: ${width}; background-image: ${backgroundImage}; background-size: ${backgroundSize};";
  }

  private toPx(x: number): string {
    return x.toString() + 'px';
  }
}
