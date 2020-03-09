<template>
  <section id="cover">
    <div class="container">
      <div class="row">
        <!-- <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto text-center form p-4 todo-form text-white"> -->
        <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 todo-form text-white">
          <div class="from-group input-group-lg">
            <input
              type="text"
              class="form-control"
              v-model="newTodo"
              name="title"
              @keyup.enter="addTodo"
              placeholder="Enter New Todo"
            />
            <!-- <span class="button">
          <button class="button" @click="addTodo">
            +
          </button>
            </span>-->
          </div>

          <div>
            <ul class="list-group">
              <li class="list-group-item clearfix" v-for="todo in todos" :key="todo.id">
                <Todo v-bind:todo="todo" v-on:delete-todo="deleteTodo" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>

    <div>
      <span class="glyphicon glyphicon-flag" aria-hidden="true">gly</span>
    </div>
  </section>
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
  props: {},
  data() {
    return {
      newTodo: "",
      todos: [
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
          completed: true
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
#cover {
  background: #222 url("https://source.unsplash.com/800x600/?coffee,food")
    center center no-repeat;
  background-size: cover;
  height: 100%;
  /* text-align: center; */
  display: flex;
  align-items: center;
  position: relative;
}
.todo-form {
  /* font-size: 18px; */
  padding: 2em;
  background-color: rgba(0, 0, 0, 0.4);
  /* border-radius: 10px; */
}
.list-group-item {
  background: transparent;
}
.list-group-item:hover {
  border: 1px solid #fff;
}
</style>
