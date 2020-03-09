<template id="todo-item">
  <div class="form-group">
    <!-- form-check-inline class makes checkbox aligned with following text span element -->
    <div class="form-check-inline">
      <input class="form-check-input" type="checkbox" v-model="todo.completed" v-on:click="toggleComplete(todo)" />
    </div>
    <span v-bind:class="{ 'completed': todo.completed }">
    {{ todo.title }}
    </span>
    <span class="pull-right">
      <button class="btn btn-xs btn-outline-danger" style="padding: 0 0.25em 0 0.25em"
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
</style>
