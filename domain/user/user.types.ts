export type UserId = string;

export interface User {
  userId: UserId;
  userEmail: string;
  userPassword: string;
  username: string;
  userFirstName: string;
  userLastName: string;
  userCreatedAt: Date;
  userUpdatedAt: Date;
}
