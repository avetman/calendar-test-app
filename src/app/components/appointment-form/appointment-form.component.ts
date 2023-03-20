import {Component, EventEmitter, Input, Output, OnInit, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Appointment} from "../../models/appointment.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ModalAddAppointmentComponent} from "../modal-add-appointment/modal-add-appointment.component";

@Component({
  selector: 'app-appointment-form',
  templateUrl: './appointment-form.component.html',
  styleUrls: ['./appointment-form.component.css']
})
export class AppointmentFormComponent implements OnInit {
  appointmentForm: FormGroup;
  appointment: Appointment;
  index: number;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { appointment: Appointment , index: number},
    private dialogRef: MatDialogRef<ModalAddAppointmentComponent>,
    private fb: FormBuilder
  ) {
    this.appointmentForm = this.fb.group({
      title: ['', Validators.required],
      date: ['', Validators.required]
    });
    this.appointment = data.appointment;
    this.index = data.index;
  }
  ngOnInit(): void {
    this.appointmentForm = this.fb.group({
      id: this.index,
      title: [this.data.appointment.title, Validators.required],
      date: [
        this.data.appointment.date,
        [Validators.required, Validators.required],
      ]

    });
  }

  onSubmit(): void {

    if (this.appointmentForm.valid) {
      const updatedAppointment: Appointment = {
        ...this.appointment,
        title: this.appointmentForm.value.title,
        date: this.appointmentForm.value.date,
      };
      this.dialogRef.close({ appointment: updatedAppointment, index: this.index });
    }
  }
  onCancel(): void {
    this.dialogRef.close();
  }

}

