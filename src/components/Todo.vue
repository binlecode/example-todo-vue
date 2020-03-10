<template id="todo-item">
  <div class="form-inline">
    <!-- form-check-inline class makes checkbox aligned with following text span element -->
    <div class="form-check-inline">
      <input class="form-check-input" type="checkbox" v-model="todo.completed"
             v-on:click="$emit('toggle-todo-complete', todo.id)" />
    </div>
    <!-- this div will hide in 'li.editing' mode -->
    <div class="view">
      <!-- <label @dblclick="$emit('edit-todo', todo)">{{ todo.title }}</label> -->
      <label @dblclick="editTodo">{{ todo.title }}</label>
    </div>
    <!-- this input will hide in li non-editing mode -->
    <input class="edit" type="text" v-model="inputTodo.title" v-todo-focus="origTodoTitle != null"
      @keyup.enter="doneEditTodo"
      @keyup.esc="cancelEditTodo" />
    <span class="pull-right">
      <button class="btn btn-xs btn-outline-danger btn-rm-todo"
              @click="$emit('delete-todo', todo.id)">
      x
      </button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'Todo',
  props: {
    todo: Object
  },
  data() {
    return {
      origTodoTitle: null
    }
  },
  computed: {
    // because prop is one directional (parent->child) and read-only
    // this is to map the todo prop to input v-model
    inputTodo: {
      get() {
        return this.todo;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  },
  methods: {
    // entering edit mode for this todo
    editTodo() {
      // cache original todo title to support cancel-edit operation
      this.origTodoTitle = this.todo.title;
      this.$emit('edit-todo', this.todo);
    },
    doneEditTodo() {
      this.$emit('done-edit-todo', {id: this.todo.id, title: this.inputTodo.title});
      this.origTodoTitle = null;
    },
    cancelEditTodo() {
      this.$emit('cancel-edit-todo', { id: this.todo.id, origTitle: this.origTodoTitle });
      this.origTodoTitle = null;
    }
  },
  // a custom directive to wait for the DOM to be updated (in this case input shows
  // and label hides for todo title editing)
  // before focusing on the input field.
  // http://vuejs.org/guide/custom-directive.html
  directives: {
    'todo-focus': function (el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
}
</script>

<style>
  .completed {
    text-decoration: line-through;
  }
  .pull-right {
    float: right;
  }
  .btn-rm-todo {
    padding: 0 0.5em;
  }
  .todo-list li.editing .view {
    display: none;
  }
  .todo-list li.editing .edit {
    display: inline-block;
    /* width: 100%; */
    padding: 12px 16px;
    margin: 0 0 0 43px;
  }
  .todo-list li .edit {
    display: none;
  }
</style>
