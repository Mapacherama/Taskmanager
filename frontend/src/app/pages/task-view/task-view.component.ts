import { Task } from './../../models/task.model';
import { List } from './../../models/list.model';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { TaskService } from 'src/app/task.service';

@Component({
  selector: 'app-task-view',
  templateUrl: './task-view.component.html',
  styleUrls: ['./task-view.component.scss']
})
export class TaskViewComponent implements OnInit {

  lists: List[];
  tasks: Task[];

  constructor(private taskService: TaskService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {

        this.taskService.getTasks(params.listId).subscribe((tasks: Task[])=> {
            this.tasks = tasks;
        })
      }
    )

    this.taskService.getLists().subscribe((lists: List[]) => {
        this.lists = lists;
    })
  }

  onTaskClick(task: Task){
    // We want to set the task to completed

    this.taskService.completeTask(task).subscribe(() =>{
      task.completed = !task.completed;
      console.log('completed.');
    });
  }
}
