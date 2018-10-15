
<template>
<b-container>
  <b-row align-h="center" class="mt-5">
    <b-col cols="5">
      <b-card class="text-center">
        <h3 class="mb-4">Register new user</h3>
                    <b-alert variant="danger"
                        dismissible
                        :show="showDismissibleAlert"
                        @dismissed="showDismissibleAlert=false">
                         Error with the server encountered, please try again!
                         If error continues please try again later or contact @ chatapp@gmail.com
                   </b-alert>
                    <b-form @submit.prevent="onSubmit" v-if="show" autocomplete="off">
            <b-form-group id="userName"
                    label="Your full name:"
                    label-for="exampleInput1">
            <b-form-input id="userName"
                    type="text"
                    v-model="form.username"
                    required
                    placeholder="Enter your name">
            </b-form-input>
            </b-form-group>            
            <b-form-group id="userEmail"
                    label="Email address:"
                    label-for="exampleInput1"
                    description="We'll never share your email with anyone else.">
            <b-form-input id="userEmail"
                    type="email"
                    v-model="form.currentEmail"
                    required
                    placeholder="Enter email">
            </b-form-input>
            </b-form-group>
            <b-form-group id="userPassword"
                    label="Password:"
                    label-for="exampleInput2">
            <b-form-input id="userPassword"
                      type="password"
                      v-model="form.currentPassword"
                      required
                      placeholder="Enter password">
            </b-form-input>
              <div class="d-flex flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight">
              <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
             </b-form-checkbox-group>
               </div>
                  </div>
                    </b-form-group>
                      <div class="d-flex justify-content-between">
                         <div>
                              <b-button type="register" variant="primary">Register</b-button>&nbsp;
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
import {loginUrl, getHeader, userUrl} from './../config'
import {clientId, clientSecret} from './../env'
import {mapState} from 'vuex'

export default {
  data () {
    return {
      form: {
        username: '',
        email: '',
        password: '',
        },
      show: true,
      showDismissibleAlert: false
    }
  },
  methods: {
    onSubmit () {
            let username = this.form.username
            let email = this.form.email
		   	    let password = this.form.password
      
      this.$store.dispatch('userStore/register', {username, email, password})
        .then(() => {
          this.$router.push('dashboard')
        })
    }
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
