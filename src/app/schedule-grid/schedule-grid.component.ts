import {  Component, OnInit, ElementRef, ComponentFactoryResolver,  Injectable,  Inject,  ReflectiveInjector, ViewContainerRef, Input } from '@angular/core';
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

export class ScheduleGridComponent implements OnInit {

  year: 2018;
  month: 1;
  @Input() events: Event[];
  viewContainerRef: ViewContainerRef;
  factoryResolver: ComponentFactoryResolver;

  ngOnInit() {
    this.year = 2018;
    this.month = 1;
    this.events = EVENTS.filter(e => e.start.getFullYear() === this.year && e.start.getMonth() === this.month);
  }

  constructor(el: ElementRef, @Inject(ViewContainerRef) viewContainerRef, @Inject(ComponentFactoryResolver) factoryResolver) {

    this.viewContainerRef = viewContainerRef;
    this.factoryResolver = factoryResolver;

    const that = this;

    $(function () {

      that.adjustScheduleGridStyle(el.nativeElement.style);

      setTimeout(function(){
        const event = { start: new Date("2018-02-01 16:00:00"), end: new Date("2018-02-01 18:00:00"), description: "HELLO", id: "e666" };
        that.addEvent(event);
      }, 2000);

    });
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
    const factory = this.factoryResolver.resolveComponentFactory(EventComponent)
    let eventInstance  = this.viewContainerRef.createComponent(factory, 0).instance;
    eventInstance.event = event;
  }
}
