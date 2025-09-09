import { User } from "./user.types";

/**
 * A domain entity representing a provider account.
 * This class is used to map data from the database into a structured object,
 * providing methods for data transformation and safety.
 */
export class UserEntity {
  private props: User;

  constructor(props: User) {
    this.props = { ...props };
  }

  get userId(): string {
    return this.props.userId;
  }

  get userEmail(): string {
    return this.props.userEmail;
  }

  get userFirstName(): string {
    return this.props.userFirstName;
  }

  get userLastName(): string {
    return this.props.userLastName;
  }

  get username(): string {
    return this.props.username;
  }

  get userPassword(): string {
    return this.props.userPassword;
  }

  get userCreatedAt(): Date {
    return this.props.userCreatedAt;
  }

  get userUpdatedAt(): Date {
    return this.props.userUpdatedAt;
  }

  /**
   * Static factory method to create an AccountEntity from a Prisma Account record.
   *
   * @param record The Account record from the database.
   * @returns A new AccountEntity instance.
   */
  static fromDb(record: User): UserEntity {
    return new UserEntity({
      userId: record.userId,
      userEmail: record.userEmail,
      userFirstName: record.userFirstName,
      userLastName: record.userLastName,
      username: record.username,
      userPassword: record.userPassword,
      userCreatedAt: record.userCreatedAt,
      userUpdatedAt: record.userUpdatedAt,
    });
  }

  // Example of a business method on the entity
  // This could be used to unlink an account from a user
  unlinkAccount(userId: string) {
    if (this.props.userId !== userId) {
      throw new Error("You can only unlink your own account");
    }
    // Logic to update the database to unlink the account
    // (Note: This would typically be done in a repository/service)
    console.log(`Account ${this.props.userId} has been unlinked.`);
  }
}
