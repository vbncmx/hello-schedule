import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { ScheduleOptions } from '../scheduleOptions';
import { Event } from '../event';
import * as $ from 'jquery';
import 'jqueryui';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: Event;

  constructor(el: ElementRef) {
    const that = this;
    $(function () {

      that.adjustStyle(that, el.nativeElement.style);

      const so = ScheduleOptions.Current();

      $(el.nativeElement).draggable({
          grid: [so.stepPx, so.dayHeightPx],
          containment: '#scheduleGrid',
          stop: function(){
            that.adjustEvent(that, el.nativeElement.style);
          }
        });

      $(el.nativeElement).resizable({
        grid: so.stepPx,
        handles: 'e, w',
        containment: '#scheduleGrid',
        stop: function(){
          that.adjustEvent(that, el.nativeElement.style);
        }
      });

    });
  }

  ngOnInit() {
  }

  private adjustStyle(ec: EventComponent, style) {
    const so = ScheduleOptions.Current();
    const minutesFromScheduleStart = ec.getDayMinutes(ec.event.start) - so.scheduleStartMinutes;
    const durationMinutes = ec.getDayMinutes(ec.event.end) - ec.getDayMinutes(ec.event.start);

    style.position = 'absolute';
    style.top = ec.toPx((ec.event.start.getDate() - 1) * so.dayHeightPx);
    style.left = ec.toPx(so.stepPx * minutesFromScheduleStart / so.stepMinutes);
    style.height = ec.toPx(so.eventHeightPx);
    style.width = ec.toPx(so.stepPx * durationMinutes / so.stepMinutes);
    style.backgroundColor = '#5495FF';
    style.color = '#ffffff';
    style.borderRadius = '5px';
    style.cursor = 'pointer';
  }

  private adjustEvent(ec: EventComponent, style) {
    const so = ScheduleOptions.Current();
    ec.event.start.setDate(this.toNum(style.top) / so.dayHeightPx + 1);
    const dayMinutes = so.scheduleStartMinutes + so.stepMinutes * this.toNum(style.left) / so.stepPx;
    ec.event.start.setHours(dayMinutes / 60);
    ec.event.start.setMinutes(dayMinutes % 60);
    const durationMinutes = so.stepMinutes * this.toNum(style.width) / so.stepPx;
    ec.event.end.setHours((dayMinutes + durationMinutes) / 60);
    ec.event.end.setMinutes((dayMinutes + durationMinutes) % 60);
  }

  private toPx(x: number): string {
    return x.toString() + 'px';
  }

  private toNum(x: string): number {
    return parseInt(x.replace('px', ''));
  }

  private getDayMinutes(date: Date) {
    return date.getHours() * 60 + date.getMinutes();
  }
}
