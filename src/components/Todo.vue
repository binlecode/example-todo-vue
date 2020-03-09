<template id="todo-item">
  <div>
    <!-- form-check-inline class makes checkbox aligned with following text span element -->
    <div class="form-check-inline">
      <input class="form-check-input" type="checkbox" v-model="todo.completed" v-on:click="toggleComplete(todo)" />
    </div>
    <span v-bind:class="{ 'completed': todo.completed }">
    {{ todo.title }}
    </span>
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
  props: ['todo'],
  methods: {
    toggleComplete(todo) {
      console.log("toggle todo: " + todo.completed);
      todo.completed = !todo.completed;
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
</style>
