export class Appointment {

  constructor(
    public id: string | number,
    public title: string,
    public date: Date,
    public day: number,
    public deleted: boolean,
    public startTime?: string,
    public duration?: number,
    public description?: string,

  ) {}

}

export interface DaysObject {
  day: number[],
  appointments: Appointment
}
