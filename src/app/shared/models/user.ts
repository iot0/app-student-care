export class User {
    Id?:string;
    Uid?: string;
    FullName?: string;
    EmailId?: string;
    CreatedAt?:Date;
    Role?:UserRole;
    Password?:string;
  }
  export enum UserRole{
      Teacher=1,
      Parent,
  }
  