import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EventComponent } from './event/event.component';
import { ScheduleGridComponent } from './schedule-grid/schedule-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    EventComponent,
    ScheduleGridComponent
  ],
  entryComponents: [
    EventComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
