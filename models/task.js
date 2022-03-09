class Task {
  constructor(Id, Task, Status, Priority, IsDeleted) {
    this.Id = Id;
    this.Task = Task;
    this.Status = Status;
    this.Priority = Priority;
    this.IsDeleted = IsDeleted;
  }
}

module.exports = Task;
