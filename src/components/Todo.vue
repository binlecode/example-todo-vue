<template id="todo-item">
  <div class="">
    <div class="view">
      <!-- have to add id to the checkbox and attribute for="" with checkbox id to the label to make checkbox work -->
      <label :for="'cb-' + todo.id" class="checkbox-label">
        <input :id="'cb-' + todo.id" type="checkbox" v-model="todo.completed"
                v-on:click="$emit('toggle-todo-complete', todo.id)" />
        <span class="checkmark"></span>
      </label>
      <span :class="{ completed: todo.completed }" @dblclick="editTodo">{{ todo.title }}</span>
      <span v-if="todo.tags">
        |
        <span v-for="tag in todo.tags" :key="tag">
          <a href="#"><span class="badge">{{ tag }}</span></a>
          |
        </span>
      </span>
      <span class="pull-right">
        <button class="btn btn-xs btn-outline-danger btn-rm-todo"
                @click="$emit('delete-todo', todo.id)">
        x
        </button>
      </span>
    </div>
    <!-- this input will hide in li non-editing mode -->
    <!-- <input class="edit" type="text" v-model.trim="inputTodo.title" v-todo-focus="origTodoTitle != null" -->
    <input class="edit" type="text" v-model.trim="inputTodoTitle" v-todo-focus="origTodoTitle != null"
      @keyup.enter="doneEditTodo"
      @keyup.esc="cancelEditTodo" />
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
      origTodoTitle: null,
      inputTodoTitle: this.todo.title
    }
  },
  computed: {
    // Because prop is one directional (parent->child) and read-only,
    // we can use computed data to map the todo prop to input v-model.
    // Also according to offical doc: ````
    // that objects and arrays in JavaScript are passed by reference,
    // so if the prop is an array or object, mutating the object or
    // array itself inside the child component will affect parent state
    // ```
    // Therefore: mirror computed varible directly on prop todo will work,
    // but, it is discouraged as it is violating one way data binding.
    // ...
    // Therefore, we will customize the input with separate v-bind and
    // v-on:change event handling
    // @see `inputTodoTitle` in data section above
    //
    // the code below is discoraged as it violates one way data change
    inputTodo: {
      get() {
        return this.todo.title;
      }
      // no setter needed, as change is on todo.title (not todo itself)
      // set(val) {
      // this.$emit('input', val);
      // }
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
      console.log('input todo title: ' + this.inputTodoTitle);
      this.$emit('done-edit-todo', {id: this.todo.id, title: this.inputTodoTitle});
      this.origTodoTitle = null;
    },
    cancelEditTodo() {
      this.$emit('cancel-edit-todo', { id: this.todo.id, origTitle: this.origTodoTitle });
      // reset input text to before-change value from cache
      this.inputTodoTitle = this.origTodoTitle;
      // clear before-change cache value
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
@import '../assets/styles/todo.css';
</style>
