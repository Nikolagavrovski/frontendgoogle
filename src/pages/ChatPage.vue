<template>
<div class="container">
    <div class="row justify-content center">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">Messanger</div>
                <div class="card-body">
                    <Conversation :contact="selectedContact" :messages="messages" @new="saveNewMessage" v-on:getnewmessages="newmessagegeett"/>
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
    import Pusher from 'pusher-js'

export default {
    components: {Conversation, ContactList},
    data() {
        return {
            selectedContact: null,
            messages: [],
            contacts: [],
            pusher: null,
            channel: null,
            loaderTrue: true,
            loaderFalse: false
        }
    },
    mounted() {
        this.$store.dispatch('loader/setLoadingState', this.loaderTrue)
        let userObject = JSON.parse(localStorage.getItem('user'))
        axios({url: getContacts + userObject.id, data: {user_id: userObject.id}, method: 'GET'})
        .then(resp => {    
                if (resp.status == 200)
                    {
                        this.contacts = resp.data
                        this.$store.dispatch('loader/setLoadingState', this.loaderFalse)
                    }
                })
        .catch(error => {
            alert('Unable to load users, please refresh the page and if error continues please contact administrator!')
        })

        // Pusher live chat helper
        this.pusher = new Pusher('9ef050ce5246b8c7880d', {
            cluster: 'eu',
            })
        const vm = this
        const channelName = 'messages-' + userObject.id
        this.channel = this.pusher.subscribe(channelName)
        this.channel.bind('new-message', function(data) {
            vm.$emit('incomingmessage', (data))
        })
        this.$on('incomingmessage', function (data) {
           this.handleIncomingMessage(data)
        });
    },
    methods: {
        startConversationWith(contact) {
                this.messages = []
                this.selectedContact = contact
            this.updateUnreadCount(contact, true)
            this.$store.dispatch('messages/clearPage')
            this.$store.dispatch('loader/setLoadingState', this.loaderTrue)
            this.$store.dispatch('loader/setInfinityState')
                let userId = contact.id
                let userObject = JSON.parse(localStorage.getItem('user'))
                let currentUser =  userObject.id
            axios({ url: getConversationById + userId + '/' + currentUser + '?page=' + 1, method: 'GET'})
            .then(response => {
                this.messages = response.data.data.reverse()
                this.$store.dispatch('loader/setLoadingState', this.loaderFalse)
            })
        },
        saveNewMessage (message) {
            this.messages.push(message)
        },
        handleIncomingMessage(data) {
            let content = data.message
            if(this.selectedContact && this.selectedContact.id == content.from){
                this.saveNewMessage(content)
                return
            }
            let userObjct = data.message.fromUserObject
            this.updateUnreadCount(userObjct, false)
            this.saveNewMessage

        },
        updateUnreadCount(contact, reset) {
            this.contacts = this.contacts.map((single) => {
                if (single.id != contact.id)
                {
                    return single;
                }
                if (reset)
                    single.unread = 0;
                else 
                    single.unread += 1;

                return single;
                }
            )},
        newmessagegeett(msgObject)
        {   
            this.messages.unshift(...msgObject.reverse())
            
        },
    }   
}

</script>

<style lang="scss" scoped>
.card-body {
    display: flex;
    padding: 0;
}
</style>
