import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { ScheduleComponent } from './schedule/schedule.component';
import { EventComponent } from './event/event.component';
import { ScheduleGridComponent } from './schedule-grid/schedule-grid.component';
import { AppointmentModalComponent } from './appointment-modal/appointment-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    ScheduleComponent,
    EventComponent,
    ScheduleGridComponent,
    AppointmentModalComponent
  ],
  entryComponents: [
    EventComponent
  ],
  imports: [
    BrowserModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
