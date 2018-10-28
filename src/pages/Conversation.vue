<template>
    <div class="conversation">
        <h1> {{ contact ? contact.name : 'Select a contact' }}</h1>
        <MessageFeed :contact="contact" :messages="messages"/>
        <MessageComposer @send="sendMessage" />
    </div>
</template>

<script>

    import MessageFeed from './MessageFeed' 
    import MessageComposer from './MessageComposer'
    import {conversationMessageSend} from './../config'

export default {
    components: {MessageFeed, MessageComposer},
    props: {
        contact: {
            type: Object,
            default: null
        },
        messages: {
            type: Array,
            default: []
        }
    },
    methods: {
        sendMessage (text){
            if (!this.contact) {
                return
            }
            let userObject = JSON.parse(localStorage.getItem('user'))
            axios({url: conversationMessageSend, data: {from: userObject.id, contact_id: this.contact.id, message: text}, method: 'POST'})
            .then(response => {
                this.$emit('new', response.data)
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.conversation {
    flex: 5;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    h1 {
        font-size: 20px;
        padding: 10px;
        margin: 0;
        border-bottom: 1px dashed lightgray;
    }
}
</style>
