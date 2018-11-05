
<script>
import {mapGetters, mapState} from 'vuex'
import NavBar from './components/NavBar'
export default {
  components: {
    NavBar
  },
  method: {
    logout: function () {
      this.$store.dispatch('store/logout')
      .then(() => {
        this.$router.push('home')
      })
    }
  },
  computed: {
    ...mapState({
      
    }),
     ...mapGetters({
     userAuth:'user/isLoggedIn',
     authStatus:'user/authStatus'
     
    })
  },
  created () {
   
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
