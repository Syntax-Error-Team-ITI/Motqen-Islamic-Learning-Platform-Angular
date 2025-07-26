import { IClassSchedule } from "./iclass-schedule";

export interface IHalaqaDetailsDto {
  id: number;
  name: string;
  description: string;
  guestLiveLink: string;
  hostLiveLink: string;
  subjectName: string;
  genderGroup: number;
  isDeleted: boolean;
  classSchedules:  IClassSchedule[];
}
