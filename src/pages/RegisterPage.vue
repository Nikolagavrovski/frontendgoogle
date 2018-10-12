<script>
export default {
  data() {
    return {
      show: true
    }
  }
}
</script>

<template>
    <b-container>
      <b-row align-h="center" class="mt-5">
        <b-col cols="5">
          <b-card class="text-center">
            <h3 class="mb-4">Login</h3>
                        <b-alert variant="danger"
                            dismissible
                            :show="showDismissibleAlert"
                            @dismissed="showDismissibleAlert=false">
                             Error with the server encountered, please try again!
                             If error continues please try again later or contact @ chatapp@gmail.com
                       </b-alert>
                        <b-form @submit="onSubmit" @reset="onReset" v-if="show">
                <b-form-group id="exampleInputGroup1"
                        label="Email address:"
                        label-for="exampleInput1"
                        description="We'll never share your email with anyone else.">
                <b-form-input id="exampleInput1"
                        type="email"
                        v-model="form.currentEmail"
                        required
                        placeholder="Enter email">
                </b-form-input>
                </b-form-group>
                <b-form-group id="exampleInputGroup2"
                        label="Password:"
                        label-for="exampleInput2">
                <b-form-input id="exampleInput2"
                          type="password"
                          v-model="form.currentPassword"
                          required
                          placeholder="Enter password">
                </b-form-input>
                  <div class="d-flex flex-row bd-highlight mb-3">
                <div class="p-2 bd-highlight">
                  <b-form-checkbox-group v-model="form.checked" id="exampleChecks">
                  <b-form-checkbox value="rememberMe">Remember me</b-form-checkbox>
                 </b-form-checkbox-group>
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
