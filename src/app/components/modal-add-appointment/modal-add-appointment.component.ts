import {Component, EventEmitter, Inject, OnInit, Output} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import { Appointment } from "../../models/appointment.model";
import { v4 as uuidv4 } from 'uuid';
@Component({
  selector: 'app-modal-add-appointment',
  templateUrl: './modal-add-appointment.component.html',
  styleUrls: ['./modal-add-appointment.component.css']
})
export class ModalAddAppointmentComponent implements OnInit {
  appointmentForm!: FormGroup;
  //   = new FormGroup({
  //   title: new FormControl('', [
  //     Validators.required,
  //     Validators.maxLength(50),
  //   ]),
  //   date: new FormControl(this.data.appointment.date, Validators.required),
  // });

  @Output() addAppointment = new EventEmitter<Appointment>();

  constructor(
    public dialogRef: MatDialogRef<ModalAddAppointmentComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment, day: number }
  ) {}
  ngOnInit(): void {
    const defaultDate = new Date();
    defaultDate.setDate(this.data.day);

    this.appointmentForm = new FormGroup({
      title: new FormControl(this.data.appointment.title, [
        Validators.required,
        Validators.maxLength(50),
      ]),
      date: new FormControl(defaultDate, Validators.required),
    });
  }

  onSubmit() {
    if (this.appointmentForm.valid) {
      const appointment: Appointment = {
        id: uuidv4(),
        title: this.appointmentForm.value.title,
        date: this.appointmentForm.value.date,
        day: this.data.day,
        deleted: false
      };
      this.dialogRef.close(appointment);
    }
  }
  onCancel() {
    this.dialogRef.close();
  }


}
