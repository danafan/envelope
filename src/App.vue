<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
  import router from './router/index.js'
  import resource from './api/resource.js'
  export default {
    created(){
      this.$router.push('/index')
    }
  }
</script>
