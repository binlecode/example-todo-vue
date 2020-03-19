<template>
  <div id="app">
    <div id="header">
      <!-- <img class="logo" src="./assets/logo.png"> -->
      <h1>todos</h1>
    </div>
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
html {
  /* set base font size */
  /* font-size: 20px; */
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  margin-top: 60px;
}
#header {
  text-align: center;
}
</style>
