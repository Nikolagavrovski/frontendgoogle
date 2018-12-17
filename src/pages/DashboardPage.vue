<script>

import {mapGetters} from 'vuex';
import {getLanguages} from './../config'

export default {
    mounted() {
        axios({url: getLanguages, method: 'GET'})
            .then(response => {
                this.languages = response.data
            }),
    this.$store.dispatch('alert/clear')
    },
    computed: {
        ...mapGetters({
     errorType: 'alert/errorType',
     errorMessage: 'alert/errorMessage',
    }),
    
  },
    data() {
        return {
            form: {
                lange: '',
            },
            languages: {},
            loaderTrue: true,
            loaderFalse: false
        }
    },
    methods: {
        onSubmit () {
            let newlanguage = this.form.lange
            this.$store.dispatch('user/update', {newlanguage})
            this.$store.dispatch('loader/setLoadingState', this.loaderTrue) 
            .then(() => {
                    this.$store.dispatch('loader/setLoadingState', this.loaderFalse)
                })
            },
     },
}
</script>

<template>
<div class="container">
    <div class="row justify-content center">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">Update translate language</div>
                <div class="card-body">
                    <div v-if="errorMessage" :class="`alert ${errorType}`">{{errorMessage}}</div>
                    <b-form @submit.prevent="onSubmit" autocomplete="off">
                            <b-form-group
                                label="Select translate language"
                                description="Select language in which you'll receive messages. Translation uses google translate engine">
                                <b-form-select
                                :options="languages"
                                required
                                v-model="form.lange">
                            </b-form-select>
                            </b-form-group>
                            <div class="d-flex justify-content-between">
                            <div>
                                <b-button type="register" variant="primary">Register</b-button>&nbsp;
                            </div>
                        </div>
                    </b-form>
                </div>
            </div>
        </div>
    </div>
</div>
</template>
