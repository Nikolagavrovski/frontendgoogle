<template>
<div class="container">
    <div class="row justify-content center">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">Messanger</div>
                <div class="card-body">
                    <Conversation :contact="selectedContact" :messages="messages"/>
                    <ContactList :contacts="contacts" @selected="startConversationWith"/>
                </div>
            </div>
        </div>
    </div>
</div>
</template>

<script>
    import Conversation from './Conversation'
    import ContactList from './ContactList'
    import {getContacts, getConversationById} from './../config'
    import {mapGetters} from 'vuex'

export default {
    components: {Conversation, ContactList},
    data() {
        return {
            selectedContact: null,
            messages: [],
            contacts: []
        }
    },
    mounted() {
        axios({url: getContacts, method: 'GET'})
        .then(resp => {    
                if (resp.status == 200)
                    {
                        this.contacts = resp.data
                    }
                })        
    },
    methods: {
        startConversationWith(contact) {
            let userId = contact.id
            console.log('Function startWithConverstionWith works')
            axios({ url: getConversationById + userId, method: 'GET'})
            .then(response => {
                console.log(response.data)
                this.messages = response.data
                this.selectedContact = contact
            })
        }
    },
    computed: {
        ...mapGetters({
            userObj: 'user/userObject'
        })
    }
}
</script>

<style lang="scss" scoped>

.card-body {
    display: flex;
    padding: 0;
}

</style>
