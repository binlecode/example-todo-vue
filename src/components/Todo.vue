<template id="todo-item">
  <div>
    <input type="checkbox" v-model="todo.completed" v-on:click="toggleComplete(todo)" />
    <span v-bind:class="{ 'completed': todo.completed }">
    {{ todo.title }}
    </span>
    <button
      class="btn btn-danger btn-xs" style="padding: 0 0.25em 0 0.25em"
      @click="$emit('delete-todo', todo.id)">
      x
    </button>
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
</style>
