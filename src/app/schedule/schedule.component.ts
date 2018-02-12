import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EVENTS } from '../event-provider';

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})

export class ScheduleComponent implements OnInit {

  year: number;
  month: number;
  events: Event[];

  constructor() { }

  ngOnInit() {
    this.year = 2018;
    this.month = 1;
    this.events = EVENTS.filter(e => e.start.getFullYear() == this.year && e.start.getMonth() == this.month);
  }

  public getTimeClass(event: Event) {
    return "t" + this.toHHmm(event.start.getHours(), event.start.getMinutes());
  }

  public getDurationClass(event: Event) {
    var hourDif = event.end.getHours() - event.start.getHours();
    var minuteDif = event.end.getMinutes() - event.start.getMinutes();
    if (minuteDif < 0) {
      minuteDif += 60;
      hourDif -= 1;
    }
    return "r" + this.toHHmm(hourDif, minuteDif);
  }

  public getDateClass(event: Event) {
    return "d" + event.start.getDate().toString();
  }

  private toHHmm(hours: number, minutes: number) {
    var hoursStr = hours < 10 ? "0" + hours.toString() : hours.toString();
    var minutesStr = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    return hoursStr + minutesStr;
  }

  public getEventClass(event: Event) {
    return this.getDateClass(event) + " " + this.getTimeClass(event) + " " + this.getDurationClass(event);
  }
}
