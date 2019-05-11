export class User {
  Id?: string;
  Uid?: string;
  FullName?: string;
  EmailId?: string;
  CreatedAt?: Date;
  Role?: UserRole;
  Password?: string;
  DOB?: Date;
  PhoneNumber?: string;
  Address?: string;

  SchoolId?: string;

  Teacher?: User;
  Student?: User;

  Class?: string;

  IsTeacherWatching?: boolean;
  IsParentWatching?: boolean;
  IsAttendanceMarked?:boolean;

  DeviceIp?:string;
}
export enum UserRole {
  School = 1,
  Teacher,
  Parent,
  Student
}
