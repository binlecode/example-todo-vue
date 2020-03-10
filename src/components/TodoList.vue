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
            <ul class="list-group todo-list">
              <!-- <li class="list-group-item clearfix" v-for="todo in todos" :key="todo.id"> -->
              <li class="list-group-item" :class="{completed: todo.completed, editing: todo == editedTodo}" v-for="todo in filteredTodos" :key="todo.id">
                <Todo :todo="todo"
                      v-on:delete-todo="deleteTodo"
                      v-on:toggle-todo-complete="toggleTodoComplete"
                      v-on:edit-todo="editTodo"
                      v-on:done-edit-todo="doneEditTodo"
                      v-on:cancel-edit-todo="cancelEditTodo" />
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
      <h1 style="color: white;">todo under editing: {{editedTodo}}</h1>
    </div>
  </section>
</template>

<script type="text/javascript">
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import axios from 'axios';

// const baseUrl = 'http://localhost:3000/todos';
const baseUrl = 'http://dot:3000/todos';

export default {
  name: "todoList",
  components: { Todo },
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
      // editedTodo is used to trigger editing view of todo entry in the list
      editedTodo: null,
      todos: []
    };
  },
  // load data from json-server
  async created() {
    try {
      const res = await axios.get(baseUrl);
      this.todos = res.data;
    } catch (e) {
      console.log(e);
    }
  },
  methods: {
    setVisibility(vis) {
      this.visibility = vis;
    },
    async addTodo() {
      if (this.newTodo) {
        const res = await axios.post(baseUrl, {
          id: uuidv4(),
          title: this.newTodo,
          completed: false
        });
        // add newly added todo to todos list
        this.todos = [...this.todos, res.data];
        // reset new todo
        this.newTodo = "";
      }
    },
    async toggleTodoComplete(todoId) {
      console.log("toggle todo: " + todoId);
      try {
        let todo = this.todos.find(td => td.id === todoId);
        todo.completed = !todo.completed;
        await axios.patch(baseUrl + `/${todoId}`, {
          completed: todo.completed
        })
      } catch (e) {
        console.log(e);
      }
    },
    async deleteTodo(todoId) {
      console.log("msg delete-todo: " + todoId);
      try {
        const res1 = await axios.delete(baseUrl + `/${todoId}`);
        console.log('delete successful: ' + res1.status);
        if (res1.status > 200) {
          console.log('Deletion error: ' + res1.status);
          return;
        }
        // reload todos list from backend
        const res = await axios.get(baseUrl);
        this.todos = res.data;
      } catch (e) {
        console.log(e);
      }
    },
    clearCompleted() {
      // todo: implement me
    },
    clearAll() {
      // todo: implement me
    },
    editTodo(todo) {
      // setting edited todo to target todo will enable edit mode for the todo li view
      this.editedTodo = todo;
    },
    async editTodoTitle(todoId, todoTitle) {
      console.log(`update todo ${todoId} with title: ${todoTitle}`);
      try {
        let todo = this.todos.find(td => td.id === todoId);
        todo.title = todoTitle;
        await axios.patch(baseUrl + `/${todoId}`, {
          title: todo.title
        })
      } catch (e) {
        console.log(e);
      }
    },
    async doneEditTodo(todoIdAndTitle) {
      await this.editTodoTitle(todoIdAndTitle.id, todoIdAndTitle.title);
      // reset editedTodo to exit edit mode
      this.editedTodo = null;
    },
    cancelEditTodo(todoIdAndOrigTitle){
      // reset todo title to original value
      let todo = this.todos.find(td => td.id === todoIdAndOrigTitle.id);
      todo.title = todoIdAndOrigTitle.origTitle;
      // reset
      this.editedTodo = null;
    }
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
.todo-list {
  list-style: none;
}
.todo-list .list-group-item {
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
