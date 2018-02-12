import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EventComponent } from './event/event.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    EventComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
