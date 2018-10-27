<template>
    <div class="feed">
        <ul v-if="contact">
            <li v-for="message in messages" v-bind:class="messageStatus(message.to, contact.id)" :key="message.id">
                <div class="text">
                    {{ message.text}}
                </div>
            </li>
        </ul>
    </div>
</template>

<script>

export default {
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
            messageReceived: 'message received'
        }
    },
    methods: {
        messageStatus(to, id){
          if (to == id) {
              return this.messageSent
          } else {
              return this.messageReceived
          }
        }
    }
}
</script>

<style lang="scss" scoped>
    .feed {
        background: #f0f0f0;
        height: 100%;
        max-height: 470px;
        overflow: scroll;
        
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

