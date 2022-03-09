class User {
  constructor(Id, FirstName, LastName, Email, UserType, Password) {
    this.Id = Id;
    this.FirstName = FirstName;
    this.LastName = LastName;
    this.Email = Email;
    this.UserType = UserType;
    this.Password = Password;
  }
}

module.exports = User;
