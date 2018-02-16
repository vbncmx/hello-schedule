import { Component, OnInit, ElementRef, NgZone } from '@angular/core';
import { Event } from '../event'

import * as $ from 'jquery'

@Component({
  selector: 'app-appointment-modal',
  templateUrl: './appointment-modal.component.html',
  styleUrls: ['./appointment-modal.component.css']
})
export class AppointmentModalComponent implements OnInit {

  event: Event;
  elementRef: ElementRef;
  ngZone: NgZone;
  onOkClick: () => void;

  constructor(elementRef: ElementRef, ngZone: NgZone) {
    this.ngZone = ngZone;
    this.elementRef = elementRef;
    this.event = new Event();
  }

  ngOnInit() { 
    this.elementRef.nativeElement.style.position = 'absolute';
    this.elementRef.nativeElement.style.zIndex = '1000';
  }

  public show(){
    $(this.elementRef.nativeElement).show();
  }

  public hide(){
    $(this.elementRef.nativeElement).hide();
  }

  public setLocation(x: number, y: number) : void {
    this.elementRef.nativeElement.style.left = this.toPx(x);
    this.elementRef.nativeElement.style.top = this.toPx(y);
  }

  private okClick(){
    if (this.onOkClick !== null){
      this.onOkClick();
    }
  }

  private toPx(x: number){
    return x.toString() + 'px';
  }

  setEvent(event: Event) : void {
    this.ngZone.run(() => {
      this.event = event;
    })
  }
}
