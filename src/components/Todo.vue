<template id="todo-item">
  <div class="form-check">
    <input class="form-check-input" type="checkbox" v-model="todo.completed" v-on:click="toggleComplete(todo)" />
    <label v-bind:class="{ 'completed': todo.completed }">
    {{ todo.title }}
    </label>
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
