export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum UserType {
  USER = 'USER',
}

export enum HistoryType {
  CREATE = 'CREATE',
  READ = 'READ',
  UPDATE = 'UPDATE',
  DELETE = 'DELETE',
}

export interface DateComponent {
  year: string;
  month: string;
  day: string;
  hour: string;
  min: string;
  sec: string;
  milSec: string;
}

export interface SecurityPassword {
  salt: string;
  hashedPassword: string;
}
