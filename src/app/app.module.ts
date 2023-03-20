import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDialogModule } from '@angular/material/dialog';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CalendarViewComponent } from './components/calendar-view/calendar-view.component';
import { AppointmentFormComponent } from './components/appointment-form/appointment-form.component';
import { AppointmentItemComponent } from './components/appointment-item/appointment-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ModalAddAppointmentComponent } from './components/modal-add-appointment/modal-add-appointment.component';
import {ReactiveFormsModule} from "@angular/forms";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatDatepickerModule} from "@angular/material/datepicker";
import { MatNativeDateModule } from '@angular/material/core';
import {MatInputModule} from "@angular/material/input";
import {MatButtonModule} from "@angular/material/button";
import {MatIconModule } from "@angular/material/icon";

@NgModule({
  declarations: [
    AppComponent,
    CalendarViewComponent,
    AppointmentFormComponent,
    AppointmentItemComponent,
    ModalAddAppointmentComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatDialogModule,
    ReactiveFormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatInputModule,
    MatButtonModule,
    DragDropModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
