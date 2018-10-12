
<script>
import {mapState} from 'vuex'
import NavBar from './components/user/NavBar'
export default {
  components: {
    NavBar
  },
  computed: {
    ...mapState({
      userStore: state => state.userStore
    })
  },
  created () {
    console.log('App.vue is created')
    const userObj = JSON.parse(window.localStorage.getItem('authUser'))
    this.$store.dispatch('setUserObject', userObj)
  }
}
</script>

<style>
  @import url('https://fonts.googleapis.com/css?family=Lato:400,700');
  body {
    background: #EEF1F4;
    font-family: 'Lato', sans-sans-serif;
  }
</style>

<template>
  <div>
    <NavBar/>
    <router-view></router-view>
  </div>
</template>
