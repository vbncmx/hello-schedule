import { AfterViewInit, Component, OnInit, ElementRef, ComponentFactoryResolver, Injectable, Inject, ReflectiveInjector, ViewContainerRef, Input, ViewChild } from '@angular/core';
import { Event } from '../event';
import { EVENTS } from '../event-provider';
import { EventComponent } from '../event/event.component';
import { ScheduleOptions } from '../scheduleOptions';
import * as $ from 'jquery';

@Component({
  selector: 'app-schedule-grid',
  templateUrl: './schedule-grid.component.html',
  styleUrls: ['./schedule-grid.component.css']
})

export class ScheduleGridComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void { }

  year: 2018;
  month: 1;
  @Input() events: Event[];
  @ViewChild('dynamic', { read: ViewContainerRef }) viewContainerRef: ViewContainerRef
  factoryResolver: ComponentFactoryResolver;
  elementRef: ElementRef;
  onSelectionEnd: (start: Date, end: Date) => void;

  ngOnInit() {
    this.year = 2018;
    this.month = 1;
    this.events = EVENTS.filter(e => e.start.getFullYear() === this.year && e.start.getMonth() === this.month);
  }

  constructor(el: ElementRef, @Inject(ComponentFactoryResolver) factoryResolver) {

    this.factoryResolver = factoryResolver;
    this.elementRef = el;

    const that = this;

    $(function () {
      that.adjustScheduleGridStyle(el.nativeElement.style);

      let selector = document.getElementById("timeSelector");
      let initialPoint = { x: 0, y: 0 };

      $(el.nativeElement).mousedown(function (e) {
        if (e.target.id === 'scheduleGrid'){
          $(selector).show();
          const so = ScheduleOptions.Current();
          selector.style.width = that.toPx(0);
          selector.style.height = that.toPx(so.dayHeightPx);
          selector.style.left = that.toPx(Math.floor(e.offsetX / so.stepPx) * so.stepPx);
          selector.style.top = that.toPx(Math.floor(e.offsetY / so.dayHeightPx) * so.dayHeightPx);
        }        
      });

      $(el.nativeElement).mousemove(function (e) {
        if ($(selector).is(":visible")) {
          const so = ScheduleOptions.Current();
          const x = parseInt(selector.style.left.replace('px', ''));

          let width = 0;
          if (e.offsetX % so.stepPx === 0) {
            width = e.offsetX - x;
          }
          else {
            width = Math.floor(e.offsetX / so.stepPx + 1) * so.stepPx - x;
          }
          if (width < so.stepPx) {
            width = so.stepPx;
          }
          
          selector.style.width = that.toPx(width);
        }
      });

      $(el.nativeElement).mouseup(function (e) {
        const so = ScheduleOptions.Current();
        if ($(selector).is(":visible")) {
          $(selector).hide();
          const day = parseInt(selector.style.top.replace('px', '')) / so.dayHeightPx + 1;

          const totalMinutesStart = so.scheduleStartMinutes + so.stepMinutes * parseInt(selector.style.left.replace('px', '')) / so.stepPx;          
          const start = that.toDate(totalMinutesStart, day);

          const totalMinutesEnd = totalMinutesStart + so.stepMinutes * parseInt(selector.style.width.replace('px', '')) / so.stepPx;
          const end = that.toDate(totalMinutesEnd, day);

          if (that.onSelectionEnd !== null){
            that.onSelectionEnd(start, end);
          }          
        }
      });
    });
  }

  private toDate(totalMinutes: number, day: number): Date {
    const date = new Date();

    date.setFullYear(this.year);
    date.setMonth(this.month);
    date.setDate(day);
    date.setHours(Math.floor(totalMinutes / 60));
    date.setMinutes(totalMinutes % 60);
    date.setSeconds(0);
    date.setMilliseconds(0);

    return date;
  }

  private adjustScheduleGridStyle(style) {

    const so = ScheduleOptions.Current();
    const scheduleMinutes = so.scheduleEndMinutes - so.scheduleStartMinutes;
    const height = this.toPx(so.dayHeightPx * 31);
    const width = this.toPx(so.stepPx * scheduleMinutes / so.stepMinutes);

    const gradientHeight1 = this.toPx(so.dayHeightPx - so.gridLineThicknessPx);
    const gradientHeight2 = this.toPx(so.dayHeightPx);
    const heightGradient = 'repeating-linear-gradient(0deg, transparent, transparent {gradientHeight1}, {line-color} {gradientHeight1}, {line-color} {gradientHeight2})'
      .replace(/{gradientHeight1}/g, gradientHeight1)
      .replace(/{gradientHeight2}/g, gradientHeight2)
      .replace(/{line-color}/g, so.gridLineColor);

    const gradientWidth1 = this.toPx(so.hourWidthPx - so.gridLineThicknessPx);
    const gradientWidth2 = this.toPx(so.hourWidthPx);
    const widthGradient = 'repeating-linear-gradient(90deg, transparent, transparent {gradientWidth1}, {line-color} {gradientWidth1}, {line-color} {gradientWidth2})'
      .replace(/{gradientWidth1}/g, gradientWidth1)
      .replace(/{gradientWidth2}/g, gradientWidth2)
      .replace(/{line-color}/g, so.gridLineColor);

    const backgroundImage = heightGradient + ', ' + widthGradient;

    const backgroundSize = this.toPx(so.hourWidthPx) + ' ' + this.toPx(so.dayHeightPx);

    style.display = 'block';
    style.position = 'relative';
    style.height = height;
    style.width = width;
    style.backgroundImage = backgroundImage;
    style.backgroundSize = backgroundSize;
    style.marginLeft = this.toPx(so.dayScaleWidthPx);
  }

  private toPx(x: number): string {
    return x.toString() + 'px';
  }

  public addEvent(event: Event) {

    const factory = this.factoryResolver.resolveComponentFactory(EventComponent);
    const eventComponent = factory.create(this.viewContainerRef.parentInjector);
    eventComponent.instance.event = event;
    this.viewContainerRef.insert(eventComponent.hostView);
  }
}
