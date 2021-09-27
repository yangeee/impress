<template>  
  <Demo/>
</template>

<script>
import Demo from './components/index.vue'

export default {
  name: 'App',
  components: {
    Demo
  },
  setup() {
  }
}
</script>

<style>
button {
    cursor: pointer;
}
.left{
    width: 200px;
    height: 100%;
    background-color: beige;
    float: left;
    position: fixed;
}
</style>
