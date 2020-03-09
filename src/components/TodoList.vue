<template>
  <section id="cover">
    <div class="container">
      <div class="row">
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
              <!-- <li class="list-group-item clearfix" v-for="todo in todos" :key="todo.id"> -->
              <li class="list-group-item clearfix" v-for="todo in filteredTodos" :key="todo.id">
                <Todo v-bind:todo="todo" v-on:delete-todo="deleteTodo" />
              </li>
            </ul>
          </div>

          <footer class="footer">
            <!-- <span>footer </span> -->
            <ul class="filters">
              <li>
                <!-- <a href="#/all" :class="{selected: visibility == 'all'}">All</a> -->
                <a href="#" :class="{selected: visibility == 'all'}" v-on:click="setVisibility('all')">All</a>
              </li>
              <li>
                <!-- <a href="#/active" :class="{selected: visibility == 'active'}">Active</a> -->
                <a href="#" :class="{selected: visibility == 'active'}" v-on:click="setVisibility('active')">Active</a>
              </li>
              <li>
                <!-- <a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a> -->
                <a href="#" :class="{selected: visibility == 'completed'}" v-on:click="setVisibility('completed')">Completed</a>
              </li>
            </ul>
            <!-- <span class="pull-right">place-holder</span> -->
          </footer>
        </div>
      </div>
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
    setVisibility(vis) {
      this.visibility = vis;
    },
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
  // computed properties
  computed: {
    filteredTodos: function() {
      if (this.visibility === 'active') {
        return this.todos.filter(todo => todo.completed !== true);
      } else if (this.visibility === 'completed') {
        return this.todos.filter(todo => todo.completed === true);
      } else {
        return this.todos;
      }
    }
  },
  props: {},
  data() {
    return {
      visibility: "all",
      // visibility: "active",
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
.footer {
  padding: 10px 15px;
  height: 20px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
}
.filters {
  margin: 0;
  padding: 0;
  list-style: none;
  position: absolute;
  right: 0;
  left: 0;
}
.filters li {
  display: inline;
}
.filters li a {
  color: inherit;
  margin: 3px;
  padding: 3px 7px;
  text-decoration: none;
  border: 1px solid transparent;
  border-radius: 3px;
}
.filters li a:hover,
.filters li a.selected {
  border-color: #ffffff;
}
</style>
