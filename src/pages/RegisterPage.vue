
<template>
<b-container>
  <b-row align-h="center" class="mt-5">
    <b-col cols="5">
      <b-card class="text-center">
        <div v-if="errorMessage" :class="`alert ${errorType}`">{{errorMessage}}</div>
        <h3 class="mb-4">Register new user</h3>
                    <b-form @submit.prevent="onSubmit" v-if="show" autocomplete="off">
            <b-form-group id="userName"
               label="Enter your name or username:"
                    >
            <b-form-input id="userName"
                    type="text"
                    v-model="form.name"
                    required
                    placeholder="Enter your name">
            </b-form-input>
            </b-form-group>            
            <b-form-group id="userEmail"
            label="Enter your e-mail address"
                >
            <b-form-input id="userEmail"
                    type="email"
                    v-model="form.email"
                    required
                    placeholder="Enter email">
            </b-form-input>
            </b-form-group>
            <b-form-group
            label="Enter your password"
            >
            <b-form-input 
                      type="password"
                      v-model="form.password"
                      required
                      placeholder="Enter password">
            </b-form-input>&nbsp;
            <b-form-group
                    label="Select translate language"
                    description="Select language in which you'll receive messages. Translation uses google translate engine">
                     <b-form-select
                      :options="languages"
                      required
                      v-model="form.lange">
            </b-form-select>
            </b-form-group>
              <div class="d-flex flex-row bd-highlight mb-3">
            <div class="p-2 bd-highlight">
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
import {loginUrl, getHeader, userUrl, getLanguages} from './../config'
import {clientId, clientSecret} from './../env'
import {mapState, mapGetters} from 'vuex'

export default {
   mounted() {
    this.$store.dispatch('alert/clear')
  },
  computed: {
    ...mapGetters({
     errorType: 'alert/errorType',
     errorMessage: 'alert/errorMessage',
    })
  },
  data () {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        lange: '',
        },
      languages: {},
      selectedOption: '',
      show: true,
    }
  },
  mounted() {
    axios({url: getLanguages, method: 'GET'})
        .then(response => {
            this.languages = response.data
        })
  },
  methods: {
    onSubmit () {
            let name = this.form.name
            let email = this.form.email
            let password = this.form.password
            let language = this.form.lange
      this.$store.dispatch('user/register', {name, email, password, language})
        .then(() => {
          this.$router.push('home')
        })
    },
  }
}

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
