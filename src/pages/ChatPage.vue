<template>
<div class="container">
    <div class="row justify-content center">
        <div class="col-sm-12">
            <div class="card">
                <div class="card-header">Messanger</div>
                <div class="card-body">
                    <Conversation :contact="selectedContact" :messages="messages" @new="saveNewMessage"/>
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
            channel: null
        }
    },
    mounted() {
        let userObject = JSON.parse(localStorage.getItem('user'))
        axios({url: getContacts + userObject.id, data: {user_id: userObject.id}, method: 'GET'})
        .then(resp => {    
                if (resp.status == 200)
                    {
                        this.contacts = resp.data
                    }
                })
        .catch(error => {
            console.log(error)
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
        })
    },
    methods: {
        startConversationWith(contact) {
            this.updateUnreadCount(contact, true)
            let userId = contact.id
            let userObject = JSON.parse(localStorage.getItem('user'))
            let currentUser =  userObject.id
            axios({ url: getConversationById + userId + '/' + currentUser, method: 'GET'})
            .then(response => {
                this.messages = response.data
                this.selectedContact = contact
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
            )}
        }   
}

</script>

<style lang="scss" scoped>
.card-body {
    display: flex;
    padding: 0;
}
</style>
