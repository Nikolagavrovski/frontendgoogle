<template>
    <div class="feed" ref="feed">
        <ul v-if="contact">
              <infinite-loading  :identifier="infinityGetter" spinner="bubbles" direction="top" @infinite="infiniteHandler" @distance="1000">
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
     infinityGetter: 'loader/infinityValue'
    }),
    },
    props: {
        contact: {
            type: Object,
        },
        messages: {
            type: Array,
            required: true
        }
    },
    data () {
        return {
            messageSent: 'message sent',
            messageReceived: 'message received',
            loaderFalse: false,
            loaderTrue: true,
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
                        this.$store.dispatch('loader/setLoadingState', this.loaderTrue)
                        let userObject = JSON.parse(localStorage.getItem('user'))
                        let currentUser =  userObject.id
                        axios({ url: getConversationById + this.contact.id + '/' + currentUser + '?page=' + this.currentPage , method: 'GET'})
                        .then(response => {
                            if (response.data.data.length != 0){
                            this.$emit('newmessages', response.data.data)
                            $state.loaded()
                            this.$store.dispatch('messages/incrementPage')
                            this.$store.dispatch('loader/setLoadingState', this.loaderFalse)
                            } else {
                            $state.complete()
                            this.$store.dispatch('loader/setLoadingState', this.loaderFalse)
                            }
                        })
        },
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

