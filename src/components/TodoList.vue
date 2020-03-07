<template>
  <div>
    <input
      type="text"
      class="input-group-field"
      v-model="newTodo"
      name="title"
      @keyup.enter="addTodo"
      placeholder="Enter New Todo"
    />
    <span class="input-group-button">
      <button class="button" @click="addTodo">
        <i class="fa fa-plus"></i>
        Add
      </button>
    </span>
    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <Todo v-bind:todo="todo" v-on:delete-todo="deleteTodo" />
      </li>
    </ul>
  </div>
</template>

<script type="text/javascript">
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";

export default {
  name: "todoList",
  components: { Todo },
  methods: {
    addTodo() {
      if (this.newTodo) {
        this.todos.push({
          id: uuidv4(),
          title: this.newTodo,
          completed: false
        });
        this.newTodo = "";
      }
    },
    toggleTodoComplete(todo) {
      todo.completed = !todo.completed;
    },
    deleteTodo(todoId) {
      console.log("msg delete-todo: " + todoId);
      this.todos = this.todos.filter(todo => todo.id !== todoId);
    },
    clearCompleted() {
      this.todos.filter(!this.completed);
    },
    clearAll() {
      this.todos = [];
    }
  },
  props: {
    todos: {
      // load some initial data to prop via constructor function
      // and prop constructor is invoked BEFORE data() function...
      default: function() {
        return [
          {
            id: 3,
            title: "Cook food",
            completed: false
          },
          {
            id: 4,
            title: "Clean up room",
            completed: true
          },
          {
            i: 5,
            title: "Finish work",
            completed: false
          }
        ];
      }
    }
  },
  data() {
    return {
      newTodo: "",
      initTodos: [
        {
          id: 1,
          title: "Go workout",
          completed: false
        },
        {
          id: 2,
          title: "Do laundry",
          completed: false
        },
        {
          id: 3,
          title: "Cook food",
          completed: false
        },
        {
          id: 4,
          title: "Clean up room",
          completed: false
        },
        {
          i: 5,
          title: "Finish work",
          completed: false
        }
      ]
    };
  }
};
</script>

<style>
</style>
