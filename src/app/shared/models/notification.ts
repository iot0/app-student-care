import { User } from './user';

export class AppNotification {
  Id?: string;
  Teacher?: User;
  Message?: string;
  Type?: NotificationType;
  IsRead?:boolean;
  Student?:User;
}

export enum NotificationType {
  Exam = 1,
  Feedback
}
