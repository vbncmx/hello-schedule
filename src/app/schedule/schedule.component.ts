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
      that.adjustScheduleGridStyle(scheduleGrid.style);

      const stepScale = document.getElementById('stepScale');
      that.adjustStepScaleStyle(stepScale.style);

      const timeMarks = document.getElementById('timeMarks');
      that.configureTimeMarksElement(timeMarks);

      const dayScale = document.getElementById('dayScale');
      that.configureDayScale(dayScale);

    });
  }

  private adjustScheduleGridStyle(style) {

    const so = ScheduleOptions.Current();
    const scheduleMinutes = so.scheduleEndMinutes - so.scheduleStartMinutes;
    const height = this.toPx(so.dayHeightPx * 31);
    const width = this.toPx(so.stepPx * scheduleMinutes / so.stepMinutes);

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

    const backgroundSize = this.toPx(so.hourWidthPx) + ' ' + this.toPx(so.dayHeightPx);

    style.position = 'relative';
    style.height = height;
    style.width = width;
    style.backgroundImage = backgroundImage;
    style.backgroundSize = backgroundSize;
    style.marginLeft = this.toPx(so.dayScaleWidthPx);
  }

  private adjustStepScaleStyle(style) {
    const so = ScheduleOptions.Current();
    const scheduleMinutes = so.scheduleEndMinutes - so.scheduleStartMinutes;
    style.width = this.toPx(so.stepPx * scheduleMinutes / so.stepMinutes);
    style.height = this.toPx(so.stepScaleHeightPx);
    style.marginLeft = this.toPx(so.dayScaleWidthPx);
    this.setScaleBackground(style, so.stepPx, so.gridLineThicknessPx);
  }

  private configureTimeMarksElement(el) {
    const so = ScheduleOptions.Current();
    const scheduleMinutes = so.scheduleEndMinutes - so.scheduleStartMinutes;
    el.style.width = this.toPx(so.stepPx * scheduleMinutes / so.stepMinutes);
    el.style.height = this.toPx(so.timeMarksPanelHeightPx);
    el.style.position = 'relative';
    el.style.marginLeft = this.toPx(so.dayScaleWidthPx);
    for (let totalMinutes = so.scheduleStartMinutes; totalMinutes <= so.scheduleEndMinutes; totalMinutes += 60) {
      const hours = totalMinutes / 60;
      const minutes = totalMinutes % 60;
      const markWidth = 40;
      const markLeft = so.stepPx * (totalMinutes - so.scheduleStartMinutes) / so.stepMinutes - markWidth / 2;

      const markStyle = 'position: absolute; left: {left}; bottom: 2px; width: {width}; text-align: center; font-size: 0.75em;'
        .replace('{left}', this.toPx(markLeft))
        .replace('{width}', this.toPx(markWidth));

      let markText = hours >= 10 ? hours.toString() : '0' + hours.toString();
      markText += ':';
      markText += minutes >= 10 ? minutes.toString() : '0' + minutes.toString();

      const markHtml = '<div style="{style}">{text}</div>'
        .replace('{style}', markStyle)
        .replace('{text}', markText);

      $(el).append(markHtml);
    }
  }

  private setScaleBackground(style, tickPeriod, tickThickness) {
    const gradientWidth1 = this.toPx(tickPeriod - tickThickness);
    const gradientWidth2 = this.toPx(tickPeriod);
    const widthGradient = 'repeating-linear-gradient(90deg, transparent, transparent {gradientWidth1}, #CCC {gradientWidth1}, #CCC {gradientWidth2})'
      .replace(/{gradientWidth1}/g, gradientWidth1)
      .replace(/{gradientWidth2}/g, gradientWidth2);
    const backgroundSize = this.toPx(tickPeriod);
    style.backgroundImage = widthGradient;
    style.backgroundSize = backgroundSize;
  }

  private configureDayScale(el) {
    const so = ScheduleOptions.Current();
    el.style.width = this.toPx(so.dayScaleWidthPx);
    el.style.height = this.toPx(so.dayHeightPx * 31);
    el.style.float = 'left';
    el.style.marginTop = this.toPx(so.timeMarksPanelHeightPx + so.stepScaleHeightPx);

    const dayMarkWrapper = '<div id="dayMarkWrapper" style="width: {width}; height: {height}; position: relative;"></div>'
      .replace('{width}', this.toPx(so.dayScaleWidthPx))
      .replace('{height}', this.toPx(so.dayHeightPx * 31));

    $(el).append(dayMarkWrapper);
    const wrapper = $('#dayMarkWrapper');

    for (let day = 0; day < 31; day++) {
      const top = day * so.dayHeightPx;
      const dayMarkStyle = 'position: absolute; top: {top}; font-size: 0.75em; float: none; width: {width}; text-align: right;'
        .replace('{top}', this.toPx(top + 5))
        .replace('{height}', this.toPx(so.dayHeightPx))
        .replace('{width}', this.toPx(so.dayScaleWidthPx - 10));

      const markHtml = '<div style="{style}">{text}</div>'
        .replace('{style}', dayMarkStyle)
        .replace('{text}', (day + 1).toString());
        wrapper.append(markHtml);
    }
  }

  private toPx(x: number): string {
    return x.toString() + 'px';
  }
}
