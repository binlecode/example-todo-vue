<template>
  <section id="cover" :style='{ "background-image": "url(" + imgUrl +") " }'>
    <div class="container">
      <div class="row">
        <div class="col-xl-5 col-lg-6 col-md-8 col-sm-10 mx-auto form p-4 todo-form text-white">
          <div id="todo-text-bar" class="input-group-lg">
            <!-- vue provides 'ref' tag to identify element in javascript -->
            <input ref="inputTextBar"
              type="text"
              class="form-control"
              v-model="newTodo"
              name="title"
              @keyup.enter="onTextBarInputEnter"
              :placeholder="this.searchMode ? 'Search Todo' : 'Enter New Todo'"
            />
            <a href="#" class="search-icon" :class="{ 'search-mode': this.searchMode }"
               v-on:click="toggleSearchMode">
              <input type="checkbox" style="display: none" v-model="searchMode" />
              <b-icon-search></b-icon-search>
            </a>
          </div>
          <div>
            <ul id="todo-list" class="todo-list">
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

          <div class="overflow-auto" v-if="total > listOptions.limit">
            <b-pagination id="todo-pagination"
              v-model="listOptions.page"
              :total-rows="total"
              :per-page="listOptions.limit"
              v-on:change="onPgChange"
              aria-controls="todo-list"
              align="fill"
              style="background: transparent"
            ></b-pagination>
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
              <!-- little button for background img change -->
              <li class="change-bg">
                <!-- <a href="#/completed" :class="{selected: visibility == 'completed'}">Completed</a> -->
                <a href="#" class="" v-on:click="changeBgPic">bg</a>
              </li>
            </ul>
          </footer>
        </div>
      </div>
      <!-- <div class="row">
        <div>
          <button class="btn btn-info" @click="changeBgPic">
            office
          </button>
        </div>
      </div> -->
    </div>
  </section>
</template>

<script type="text/javascript">
import Todo from "./Todo";
import ApiServiceRest from '../services/ApiService';
import ApiServiceLocal from '../services/LocalStorageApiService';
// define API service according to env set in 'prod.env.js' file
// note that dev.env.js file loads all prod.env.js values and then apply override selectively
console.log(`process.env.CRUD_API = ${process.env.CRUD_API}`);
const ApiService = process.env.CRUD_API === 'REST' ? ApiServiceRest : ApiServiceLocal;

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
      imgUrl: "https://source.unsplash.com/1024x768/?coffee",
      imgCategories: [
        'office',
        'nature',
        'travel',
        'food',
        'space',
        'tennis'
      ],
      visibility: "all",
      // visibility: "active",
      newTodo: "",
      // search mode of input text bar
      searchMode: false,
      // editedTodo is used to trigger editing view of todo entry in the list
      editedTodo: null,
      todos: [],
      total: 0,
      listOptions: {
        page: 1,
        limit: 6,
        sort: 'createdAt',
        order: 'desc'
      }
    };
  },
  // load data from json-server during `created` vue lifecycle event callback
  created() {
    this.listTodos();
  },
  methods: {
    changeBgPic(evt) {
      // this.imgUrl = "https://source.unsplash.com/800x600/?office," + Math.random().toString().substring(2, 4);
      const catIdx = Math.floor(Math.random() * this.imgCategories.length);
      console.log('change bg pic to category: ' + this.imgCategories[catIdx]);
      this.imgUrl = "https://source.unsplash.com/1024x768/?" + this.imgCategories[catIdx];
    },
    /** */
    setVisibility(vis) {
      this.visibility = vis;
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
    /** event handler to toggle text bar search mode */
    toggleSearchMode(evt) {
      this.searchMode = !this.searchMode;
      this.$refs.inputTextBar.focus();
    },
    /** event hander to handle text input between search and new todo adding */
    onTextBarInputEnter(evt) {
      console.log('catch text bar enter, search mode: ' + this.searchMode);
      if (this.searchMode) {
        this.searchTodoNew();
      } else {
        this.addTodo();
      }
    },
    /** event hander for pagination change */
    onPgChange(evt) {
      console.log('changing page to ' + evt);
      this.listOptions.page = evt;
      if (this.searchMode) {
        this.searchTodo();
      } else {
        this.listTodos();
      }
    },
    /** event handler for a new search todo  */
    async searchTodoNew(options = {}) {
      // reset pagination values for a new search
      this.listOptions.page = 1;
      await this.searchTodo(options);
    },
    /** event handler to search todo */
    async searchTodo(options = {}) {
      console.log('searching todo with q: ' + this.newTodo);
      options['q'] = this.newTodo;
      await this.listTodos(options);
    },
    /** event handler to list todos */
    async listTodos(options = {}) {
      let params = {
        _limit: options.limit || this.listOptions.limit,
        _page: options.page || this.listOptions.page,
        _sort: options.sort || this.listOptions.sort,
        _order: options.order || this.listOptions.order
      };
      if (options.q) {
        params.q = options.q;
      }
      console.log("list todos with params:");
      for (let k in params) {
        console.log(`${k} => ${params[k]}`);
      }
      const resp = await ApiService.listTodos(params);
      this.todos = resp.data;
      // todo: this is bad... should decouple from underlying API impl (Axios)
      this.total = resp.headers['x-total-count'];
    },
    /** event handler to add todo */
    async addTodo() {
      if (this.newTodo) {
        const res = await ApiService.insertTodo({title: this.newTodo, completed: false});
        // if save successful, add newly added todo to todos list
        if (res) {
          this.todos = [res.data, ...this.todos];
          this.total += 1;
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
      await ApiService.patchTodo(todoId, {completed: todo.completed});
    },
    /** event handler to complete todo edit */
    async doneEditTodo(todoIdAndTitle) {
      console.log(`update todo ${todoIdAndTitle.id} with title: ${todoIdAndTitle.title}`);
      let todo = this.todos.find(td => td.id === todoIdAndTitle.id);
      todo.title = todoIdAndTitle.title;
      await ApiService.patchTodo(todo.id, {title: todo.title});
      // reset editedTodo to exit edit mode
      this.editedTodo = null;
    },
    async deleteTodo(todoId) {
      await ApiService.deleteTodo(todoId);
      await this.listTodos();
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
@import '../assets/styles/todo-list.css';
</style>
