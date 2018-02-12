import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EVENTS } from '../event-provider';
import { EventComponent } from "../event/event.component";

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
}
