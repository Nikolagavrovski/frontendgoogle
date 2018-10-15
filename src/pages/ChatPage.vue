<script>
import ChatUserList from './../components/chat/ChatUserList'

export default {
  components: {
    'user-list': ChatUserList
  }
}
</script>

<template>
  <b-container>
  <!-- Content here -->
      <b-jumbotron header="Chat application" lead="Bootstrap 4 Components for Vue.js 2" >
      </b-jumbotron>
    <b-row>
        <b-col cols="2" md="2" id="user-list-col">
        <user-list/>
        </b-col>
        <b-col cols="10" md="10" id="chat-content-wrapper">
          Show the chat content
        </b-col>
      </b-row>
  </b-container>
</template>
