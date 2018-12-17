
<script>
import {mapGetters, mapState} from 'vuex'
import NavBar from './components/NavBar'
import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
Vue.use(Loading)

export default {
  components: {
    NavBar, Loading
  },
  data() {
    return {
      loadingState: this.isLoadingState,
      isCancable: this.isCancableState,
      colorLoader: '#004DFF'
    }
  },
  method: {
    logout: function () {
      this.$store.dispatch('store/logout')
      .then(() => {
        this.$router.push('home')
      })
    },
    onCancel() {
      console.log('User cancelled the loader.')
    }
  },
  computed: {
     ...mapGetters({
     userAuth:'user/isLoggedIn',
     authStatus:'user/authStatus',
     isLoadingState: 'loader/isLoadingStateActive',
     isCancableState: 'loader/isCancableState',
    })
  },
}
</script>

<style lang="scss">
  @import '../node_modules/bootstrap/scss/bootstrap.scss';
</style>

<template>
  <div>
     <div class="vld-parent">
        <loading :active="isLoadingState" 
        :color="this.colorLoader"
        :can-cancel="isCancableState" 
        :is-full-page="true"></loading>
    </div>
    <NavBar/>
    <router-view></router-view>
  </div>
</template>
