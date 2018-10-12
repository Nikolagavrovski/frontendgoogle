<template>

</template>

<script>
import {mapState} from 'vuex'
export default {
  computed: {
    ...mapState({
      chatStore: state => state.chatStore
    })
  }
}
</script>



<!--v-for"user in chatStore.userList"  ->
