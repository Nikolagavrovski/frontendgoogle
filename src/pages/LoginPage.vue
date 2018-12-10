
<template>
<b-container>
  <b-row align-h="center" class="mt-5">
    <b-col cols="5">
      <b-card class="text-center">
        <div v-if="errorMessage" :class="`alert ${errorType}`">{{errorMessage}}</div>
        <h3 class="mb-4">Login</h3>
                    <b-form @submit.prevent="onSubmit" v-if="show" autocomplete="off">
            <b-form-group
                    label="Email address:"
                    description="We'll never share your email with anyone else.">
            <b-form-input
                    type="email"
                    v-model="form.username"
                    required
                    placeholder="Enter email">
            </b-form-input>
            </b-form-group>
            <b-form-group
                    label="Password:"
                    >
             <b-form-input
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password">
            </b-form-input>
              <div class="d-flex flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight">

               </div>
                  </div>
                    </b-form-group>
                      <div class="d-flex justify-content-between">
                         <div>
                              <b-button type="submit" variant="primary">Submit</b-button>&nbsp;
                              <b-button type="register" variant="danger" :to="{name: 'register'}">Register</b-button>
                         </div>
                       <div>
                     <a href="#">Forgot password?</a>
                   </div>
                 </div>
               </b-form>
            </b-card>
          </b-col>
        </b-row>
      </b-container>
</template>

<script>
import {mapState, mapActions, mapGetters} from 'vuex'
export default {
  mounted() {
    this.$store.dispatch('alert/clear')
  },
  computed: {
    ...mapGetters({
     errorType: 'alert/errorType',
     errorMessage: 'alert/errorMessage',
    }),
  },
  data () {
    return {
      form: {
        username: 'nikolagavr@gmail.com',
        password: 'password',
        },    
      show: true,
      showDismissibleAlert: false
    }
  },
  methods: {
    onSubmit () {
        let username = this.form.username
		   	let password = this.form.password
        this.$store.dispatch('user/login', {username, password})
        .then(() => {
          this.$router.push('chat')
        })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>  

</style>
