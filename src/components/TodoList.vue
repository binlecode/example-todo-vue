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
          </div>
          <div>
            <ul class="todo-list">
              <!-- <li class="list-group-item clearfix" v-for="todo in todos" :key="todo.id"> -->
              <li class="list-group-item" :class="{ editing: todo == editedTodo }"
                  v-for="todo in filteredTodos" v-bind:key="todo.id">
                <Todo v-bind:todo="todo"
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
    </div>
  </section>
</template>

<script type="text/javascript">
import { v4 as uuidv4 } from "uuid";
import Todo from "./Todo";
import axios from 'axios';

// register axios intercepter to cover general API error control
axios.interceptors.response.use(
  function(response) { return response; }, // happy path
  function(error) { // unhappy path
    // handle error
    if (error.response) {
      alert(error.response.data.message);
      console.log(error);
    }
  }
);

// const baseUrl = 'http://localhost:3000/todos';
// const baseUrl = 'http://dot:3000/todos';
const baseUrl = 'http://134.122.19.243:3000/todos';

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
  // load data from json-server during created vue lifecycle event callback
  created() {
    this.listTodos().then(res => {
      this.todos = res.data;
    });
  },
  methods: {
    setVisibility(vis) {
      this.visibility = vis;
    },
    /** event handler to add todo */
    async addTodo() {
      if (this.newTodo) {
        const res = await this.insertTodo({title: this.newTodo, completed: false});
        // if save successful, add newly added todo to todos list
        if (res) {
          this.todos = [...this.todos, res.data];
        }
        // reset new todo string
        this.newTodo = "";
      }
    },
    /** event handler to toggle todo completed property */
    async toggleTodoComplete(todoId) {
      console.log("toggle todo: " + todoId);
      let todo = this.todos.find(td => td.id === todoId);
      todo.completed = !todo.completed;
      await this.patchTodo(todoId, {completed: todo.completed});
    },
    /** event handler to complete todo edit */
    async doneEditTodo(todoIdAndTitle) {
      console.log(`update todo ${todoIdAndTitle.id} with title: ${todoIdAndTitle.title}`);
      let todo = this.todos.find(td => td.id === todoIdAndTitle.id);
      todo.title = todoIdAndTitle.title;
      await this.patchTodo(todo.id, {title: todo.title});
      // reset editedTodo to exit edit mode
      this.editedTodo = null;
    },
    /** event handler to enable todo edit mode */
    editTodo(todo) {
      // setting edited todo to target todo will enable edit mode for the todo li view
      this.editedTodo = todo;
    },
    /** event handler to cancel todo edit */
    cancelEditTodo(todoIdAndOrigTitle) {
      // reset editedTodo to exit edit mode
      this.editedTodo = null;
    },

    /** APIs that should move to a separate code module and imported */

    /** API list todos */
    async listTodos() {
      try {
        const res = await axios.get(baseUrl);
        return res;
      } catch (e) {
        console.log(e);
      }
    },
    /** API insert todo */
    async insertTodo(data) {
      try {
        const res = await axios.post(baseUrl, {
          id: uuidv4(),
          title: data.title,
          completed: data.completed
        });
        return res;
      } catch (e) {
        console.log(e);
        return null;
      }
    },
    /** API patchTodo */
    async patchTodo(todoId, data = {}) {
      let properties = {};
      if (data.title) {
        properties.title = data.title;
      }
      if (data.completed != null) {
        properties.completed = data.completed;
      }
      try {
        await axios.patch(baseUrl + `/${todoId}`, properties);
      } catch (e) {
        console.log(e);
      }
    },
    /** API delete todo */
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
  margin: 0;
  padding: 0;
  list-style: none;
}
.todo-list .list-group-item {
  padding: 0.75rem 0.75rem;
  background: transparent;
}
.todo-list .list-group-item:hover {
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
