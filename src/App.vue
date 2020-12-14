<template>
  <div id="app">
    <nav-bar />
    <el-container class="bg-blue">
      <List />
    </el-container>
  </div>
</template>

<script>
import NavBar from './components/NavBar'
import List from './components/List'

export default {
  name: 'App',
  components: {
    NavBar, 
    List,
  },
}
</script>

<style scoped>
.bg-blue {
  min-height: 90vh;
  background-color:rgb(244,246,250);
}
</style>