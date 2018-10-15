<script>
import {mapGetters} from 'vuex'
export default {
    computed: {
        ...mapGetters([
            'isLoggedIn',
            'authStatus'
        ])
    }
}
</script>

<template>

<b-container>
<h2>This is Dashboard</h2>

</b-container>

</template>
