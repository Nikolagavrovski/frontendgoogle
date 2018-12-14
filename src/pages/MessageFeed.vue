<template>
    <div class="feed" ref="feed">
        <ul v-if="contact">
            <infinite-loading spinner="bubbles" direction="top" @infinite="infiniteHandler" @distance="1000">
                <div slot="spinner">Loading...</div>
                <div slot="no-more">No more message</div>
                <div slot="no-results">No results message</div>
            </infinite-loading>
            <li v-for="message in messages" v-bind:class="messageStatus(message.to, contact.id)" :key="message.id">
                <div class="text">
                    {{ message.text}}
                </div>
            </li>
            
        </ul>
    </div>
</template>

<script>
import {getConversationById} from './../config'
import {mapGetters} from 'vuex'

export default {
    computed: {
        ...mapGetters({
     currentPage:'messages/getCurrentPN',
    })
    },
    props: {
        contact: {
            type: Object,
        },
        messages: {
            type: Array,
            required: true
        },
        page: {
            type: Number,
        }
    },
    data () {
        return {
            messageSent: 'message sent',
            messageReceived: 'message received',
        }
    },
    methods: {
        messageStatus(to, id){
          if (to == id) {
              return this.messageSent
          } else {
              return this.messageReceived
          }
        },
        scrollToBottom () {
            setTimeout(() => {
                this.$refs.feed.scrollTop = this.$refs.feed.scrollHeight - this.$refs.feed.clientHeight
            }, 50)
        },
        infiniteHandler($state) {
                    let userObject = JSON.parse(localStorage.getItem('user'))
                    let currentUser =  userObject.id
                    axios({ url: getConversationById + this.contact.id + '/' + currentUser + '?page=' + this.currentPage , method: 'GET'})
                    .then(response => {
                        console.log(this.currentPage)
                        if (response.data.length != 0){
                        this.$emit('newmessages', response.data.data)
                        this.$store.dispatch('messages/incrementPage')
                        $state.loaded()
                        }
                        $state.complete()
                    })
        }
    },
    watch: {
        contact(contact) {
            this.scrollToBottom()
        },
        messages(messages) {
            this.scrollToBottom()
        }
    }
}
</script>

<style lang="scss" scoped>
    .feed {
        background: #f0f0f0;
        height: 100%;
        max-height: 470px;
        overflow-y: scroll;
        
        ul {
            list-style: none;
            padding: 10px;
            
            li {
                &.message {
                    margin: 10px;
                    width: 100%;
                    
                    .text {
                        max-width: 200px;
                        border-radius: 5px;
                        padding: 12px;
                        display: inline-block;
                    }
                    &.received {
                        text-align: right;
                    
                    .text {
                        background: #ffffff;
                    }
                    }

                    &.sent {
                        text-align: left;
                    }
                    .text {
                        background: #d0ffda;
                    }
                }
            }
        }
    }
</style>

