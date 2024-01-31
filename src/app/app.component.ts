import {Component} from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title: string = 'To-Do Application';

  editedValue: string | number;

  editMode: boolean;

  currentIndex: number;

  taskObj: Task;

  taskList: Task[] = [];

  minDate: string;

  isDateValid: boolean = false;

  selectedTask: any = null;

  // ------------------------------------------------------------------------------------------------

  ngOnInit(): void {
  }


  get noTasksFound(): boolean {
    return this.taskList.length === 0;
  }

  validateDate(): void {
    this.isDateValid = !!this.taskObj.dueDate; // Check if a valid date is selected
  }

  // ------------------------------CONSTRUCTOR SECTION-----------------------------------------------
  constructor() {
    this.taskObj = new Task();
    this.minDate = new Date().toISOString().split('T')[0];

    this.editedValue = '';
    this.editMode = false;
    this.currentIndex = 0;

    const localData = localStorage.getItem('ToDo');
    if (localData != null) {
      this.taskList = JSON.parse(localData);
    }
  }

  // ------------------------------------------------------------------------------------------------

  // -------------------------ACCESSING LOCAL STORAGE------------------------------------------------
  updateLocalStorage(): void {
    localStorage.setItem('ToDo', JSON.stringify(this.taskList));
  }

  // -------------------------------------------------------------------------------------------------

  clearTask(): void {

    this.taskList = [];
    this.updateLocalStorage();
  }

  // --------------------------------CREATING NEW TASK------------------------------------------------
  createTask(): void {
    console.log('Task is created.');

    const task = JSON.stringify(this.taskObj);
    const parseTask = JSON.parse(task);

    this.taskList.push(parseTask);

    this.updateLocalStorage();
  }

  onComplete() {
    this.updateLocalStorage();
  }

  // -------------------------------------------------------------------------------------------------

  // -------------------------DELETING A PARTICULAR DATA----------------------------------------------

  onDelete(index: number): void {
    this.taskList.splice(index, 1);
    this.updateLocalStorage();
  }

  // -------------------------------------------------------------------------------------------------

  // ---------------------------EDITING / UPDATING SECTION-------------------------------------------

  onEdit(index: number): void {
    this.editedValue = this.taskList[index].taskName;
    this.editMode = true;
    this.currentIndex = index;
  }

  updateEditMode(): void {
    this.editMode = false;
    this.editedValue = '';
  }

  onSave(): void {
    this.taskList[this.currentIndex].taskName = this.editedValue;
    this.updateEditMode();
    this.updateLocalStorage();
  }

  onExit(): void {
    this.updateEditMode();
  }

  // --------------------------------------------------------------------------------------------------
}

export class Task {
  taskName: string | number;
  dueDate: string;
  isCompleted: boolean;

  constructor() {
    this.taskName = '';
    this.dueDate = '';
    this.isCompleted = false;
  }
}
