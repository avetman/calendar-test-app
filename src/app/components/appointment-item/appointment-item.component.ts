import { Component, Input, Output, EventEmitter } from '@angular/core';
import {Appointment} from "../../models/appointment.model";

@Component({
  selector: 'app-appointment-item',
  templateUrl: './appointment-item.component.html',
  styleUrls: ['./appointment-item.component.css']
})
export class AppointmentItemComponent {
  @Input() appointment!: Appointment;
  @Output() deleteAppointment = new EventEmitter<Appointment>();
  @Output() editAppointment = new EventEmitter<Appointment>();

  constructor() {
  }
  onDelete(): void {
    this.deleteAppointment.emit(this.appointment);
    //this.deleteAppointment.emit(this.appointment);
  }
  onEdit(): void {
    this.editAppointment.emit(this.appointment);
  }

  /*onEdit(): void {
    this.editAppointment.emit({ appointment: this.appointment, index: this.index });
  }*/
 /* onEditAppointment({ appointment, index }: { appointment: Appointment, index: number }): void {
    this.editAppointment.emit({ appointment, index });
  }*/
}
