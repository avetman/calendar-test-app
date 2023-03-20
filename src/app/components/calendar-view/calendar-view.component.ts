import {
  Component,
  ElementRef, Input,
  OnInit,
  SimpleChanges, ViewChild,
} from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {Appointment, DaysObject} from "../../models/appointment.model";
import { ModalAddAppointmentComponent } from '../modal-add-appointment/modal-add-appointment.component';
import {AppointmentFormComponent} from "../appointment-form/appointment-form.component";
import {
  CdkDragDrop,
  CdkDragEnter,
  CdkDragExit, CdkDragStart, copyArrayItem,
  DragDropModule,
  moveItemInArray,
  transferArrayItem
} from '@angular/cdk/drag-drop';



@Component({
  selector: 'app-calendar-view',
  templateUrl: './calendar-view.component.html',
  styleUrls: ['./calendar-view.component.css']
})
export class CalendarViewComponent implements OnInit {


  daysInMonth: number[] = [];
  day: number = 1
  appointmentsByDay: { day: number, appointments: Appointment[] }[] = [];
  currentYear: number = new Date().getFullYear();
  currentMonth: number = new Date().getMonth();

  selectedDay: number = 0;

  constructor(
    private dialog: MatDialog,

  ) {

  }

  ngOnInit(): void {
    const currentDate = new Date();
    const totalDays = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() + 1,
      0
    ).getDate();
    this.daysInMonth = Array.from({length: totalDays}, (_, i) => i + 1);

    this.appointmentsByDay = this.daysInMonth.map((day) => {
      return {
        day: day,
        appointments: []
      };
    });


  }

  // Open the appointment form modal
  openAppointmentForm(day: number): void {
    const selectedDate = new Date();
    selectedDate.setFullYear(new Date().getFullYear());
    selectedDate.setMonth(new Date().getMonth());
    selectedDate.setDate(day);

    const dialogRef = this.dialog.open(ModalAddAppointmentComponent, {
      width: '500px',
      data: {
        appointment: new Appointment(day, '', new Date(), day, false),
        day
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const updatedAppointmentsByDay = this.appointmentsByDay.map((dayObj) => {
          if (dayObj.day === day) {
            const updatedAppointments = [...dayObj.appointments, result];
            return {
              ...dayObj,
              appointments: updatedAppointments,
            };
          } else {
            return dayObj;
          }
        });
        this.appointmentsByDay = updatedAppointmentsByDay;
      }
    });
  }

  getAppointmentsForSelectedDay(day: number): Appointment[] {
    const selectedDayObj = this.appointmentsByDay
      .map((dayObj) => {
        if (dayObj.day === day) {
          return {...dayObj, appointments: [...dayObj.appointments]};
        } else {
          return dayObj;
        }
      })
      .find((dayObj) => dayObj.day === day);

    return selectedDayObj ? selectedDayObj.appointments : [];

  }


  onSelectedDay(day: number): void {
    this.selectedDay = day;
    this.openAppointmentForm(day); // open the appointment form modal when a day is selected
  }

  onDeleteAppointment(appointment: Appointment): void {
    const updatedAppointmentsByDay = this.appointmentsByDay.map((dayObj) => {
      const updatedAppointments = dayObj.appointments.filter(a => a.id !== appointment.id);
      return {
        ...dayObj,
        appointments: updatedAppointments,
      };
    });
    this.appointmentsByDay = updatedAppointmentsByDay;
  }
  onEditAppointment(appointment: Appointment, index: number): void {

    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: {appointment, index},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const {appointment, index, deleted} = result;
        if (deleted) {

          this.onDeleteAppointment(appointment);
        } else {
          const updatedAppointmentsByDay = this.appointmentsByDay.map((dayObj) => {
            const updatedAppointments = dayObj.appointments.map((a, i) => {
              if (a.id === appointment.id) {
                return appointment;
              } else {
                return a;
              }
            });
            return {
              ...dayObj,
              appointments: updatedAppointments,
            };
          });
          this.appointmentsByDay = updatedAppointmentsByDay;
        }
      }
    });
  }

//this variant only worked inside a day
  /*onEditAppointment(appointment: Appointment, index: number): void {
    // Open modal/dialog to display form for editing the appointment
    const dialogRef = this.dialog.open(AppointmentFormComponent, {
      data: {appointment, index},
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const {appointment, index, deleted} = result;
        if (deleted) {
          // Delete the appointment
          this.onDeleteAppointment(appointment);
        } else {
          const updatedAppointmentsByDay = this.appointmentsByDay.map((dayObj) => {
            if (dayObj.day === appointment.day) {
              const updatedAppointments = dayObj.appointments.map((a, i) =>
                i === index ? appointment : a
              );
              return {
                ...dayObj,
                appointments: updatedAppointments,
              };
            } else {
              return dayObj;
            }
          });
          this.appointmentsByDay = updatedAppointmentsByDay;
        }
      }
    });
  }*/

  onAppointmentDragEntered(event: CdkDragEnter) {
      console.log(event)
  }
  onAppointmentDragEnded() {
    console.log('ended')
  }


  onAppointmentDropped(event: CdkDragDrop<Appointment[]>, day: number) {
    if(event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const dayObj = this.appointmentsByDay.find((dayObj) => dayObj.day === day);
      if (dayObj) {
        dayObj.appointments = [...event.container.data];
      }

    } else {

         const previousDay = parseInt(event.previousContainer.id.replace("cdk-drop-list-", ""));
         const currentDay = parseInt(event.container.id.replace("cdk-drop-list-", ""));
         const previousDayObj = this.appointmentsByDay[previousDay];
         const currentDayObj = this.appointmentsByDay[currentDay];


         const appointment = event.previousContainer.data[event.previousIndex];


         previousDayObj.appointments = previousDayObj.appointments.filter((a) => a.id !== appointment.id);


         if (!currentDayObj) {

           const newDayObj = {
             day: currentDay,
             appointments: [appointment],
           };
           console.log(newDayObj)
           this.appointmentsByDay.push(newDayObj);
         } else {
           currentDayObj.appointments.push(appointment);
         }


    }
  }






 /* onAppointmentDropped(event: CdkDragDrop<Appointment[]>, day: number) {


    if (event.previousContainer === event.container) {

      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
      const dayObj = this.appointmentsByDay.find((dayObj) => dayObj.day === day);
      if (dayObj) {
        dayObj.appointments = [...event.container.data];
      }

    } else {

      const previousDay = parseInt(event.previousContainer.id.replace("cdk-drop-list-", ""));
      const currentDay = parseInt(event.container.id.replace("cdk-drop-list-", ""));

      const previousDayObj = this.appointmentsByDay[previousDay];
      const currentDayObj = this.appointmentsByDay[currentDay];


      if (previousDayObj.appointments.length > 0) {
        transferArrayItem(
          event.previousContainer.data,
          event.container.data,
          event.previousIndex,
          event.currentIndex
        );
        previousDayObj.appointments = [...event.previousContainer.data];
        currentDayObj.appointments = [...event.container.data];
      }else {
        currentDayObj.appointments.push(...event.container.data);
      }



    }
  }*/
}
