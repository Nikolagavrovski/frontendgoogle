
<script>
import {mapGetters} from 'vuex'
import NavBar from './components/NavBar'
export default {
  components: {
    NavBar
  },
  computed: {
    ...mapGetters([
      'isLoggedIn',
      'authStatus'
    ])
  },
  created () {
    //console.log('App.vue is created')
    //const userObj = JSON.parse(window.localStorage.getItem('authUser'))
    //this.$store.dispatch('setUserObject', userObj)
  }
}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

<template>
  <div>
    <NavBar/>
    <router-view></router-view>
  </div>
</template>
