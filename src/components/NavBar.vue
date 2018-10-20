<script>

import {mapActions} from 'vuex'
export default {
  methods: {
    handleSignOut () {
      this.$store.dispatch('userStore/logout')
      window.localStorage.removeItem('token')
      window.localStorage.removeItem('token')
      this.$router.push({path: '/'})
    }
  }
}
</script>

<template>

<nav class="navbar navbar-expand-lg navbar-dark bg-primary">
  <a class="navbar-brand" href="#">Chatex</a>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarColor01" aria-controls="navbarColor01" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarColor01">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item active"><a class="nav-link">Home <span class="sr-only">(current)</span></a></li>
      <li class="nav-item"><router-link :to="{ name: 'chat' }" class="nav-link">Chat</router-link></li>
      <li class="nav-item"><router-link :to="{ name: 'register' }" class="nav-link">Register</router-link></li>
      <li class="nav-item"><a v-on:click="handleSignOut" class="nav-link" href="/">Logout</a></li> 
    </ul>
  <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
  <button type="button" class="btn btn-primary">Primary</button>
  <div class="btn-group" role="group">
    <button id="btnGroupDrop1" type="button" class="btn btn-primary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false"></button>
    <div class="dropdown-menu" aria-labelledby="btnGroupDrop1" x-placement="bottom-start" style="position: absolute; will-change: transform; top: 0px; left: 0px; transform: translate3d(0px, 34px, 0px);">
      <a class="dropdown-item" href="#">Dropdown link</a>
      <a class="dropdown-item" href="#">Dropdown link</a>
      </div>
    </div>
  </div>

    
  </div>
</nav>
</template>
