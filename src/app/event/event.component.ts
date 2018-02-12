import { Component, OnInit, Input } from '@angular/core';
import { Event } from '../event';

@Component({
  selector: 'app-event',
  templateUrl: './event.component.html',
  styleUrls: ['./event.component.css']
})
export class EventComponent implements OnInit {

  @Input() event: Event;
  dayStartMinutes: number;

  constructor() { }

  ngOnInit() {
    this.dayStartMinutes = 6 * 60; // schedule starts from 6:00
  }

  public getTimeClass() {
    var minutes = this.event.start.getMinutes() + this.event.start.getHours() * 60 - this.dayStartMinutes;
    return "t" + minutes.toString();
  }

  public getDurationClass() {
    var hourDif = this.event.end.getHours() - this.event.start.getHours();
    var minuteDif = this.event.end.getMinutes() - this.event.start.getMinutes() + hourDif * 60;    
    return "r" + minuteDif.toString();
  }

  public getDateClass() {
    return "d" + this.event.start.getDate().toString();
  }

  private toHHmm(hours: number, minutes: number) {
    var hoursStr = hours < 10 ? "0" + hours.toString() : hours.toString();
    var minutesStr = minutes < 10 ? "0" + minutes.toString() : minutes.toString();
    return hoursStr + minutesStr;
  }

  public getEventClass() {
    return this.getDateClass() + " " + this.getTimeClass() + " " + this.getDurationClass();
  }
}
