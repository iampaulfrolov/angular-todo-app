import {Component, OnInit} from '@angular/core'
import {Todo, TodosService} from './todos.service'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent implements OnInit {

  todos: Todo[] = []
  todoTitle = ''
  error = ''
  loading = false

  constructor(private todosServices: TodosService) {}
  ngOnInit() {
    this.fetchTodos()
  }

  addTodo() {
    if (!this.todoTitle.trim()) {
      return
    }
    this.todosServices.addTodo({
      title: this.todoTitle,
      completed: false
    }).subscribe(todo => {
      console.log(todo)
      this.todos.unshift(todo)
      this.todoTitle = ''
    })
  }

  fetchTodos() {
    this.loading = true
    this.todosServices.fetchTodos()
      .subscribe(todos => {
        this.todos = todos
        this.loading = false
      }, error => {
        console.log(error.message)
        this.error = error.message
      })
  }

  removeTodo(id: number) {
    this.todosServices.removeTodo(id)
      .subscribe(() => {
        this.todos = this.todos.filter(t => t.id !== id)
      })
  }

  completeTodo(id: number) {
    this.todosServices.completeTodo(id)
      .subscribe(todo => {
        this.todos.find(t => t.id === todo.id).completed = true
      })
  }
}

