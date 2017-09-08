<template>
  <div class="chatbox">
    <div class="chat_window">
      <div class="top_menu">
          <div class="buttons">
              <div class="button close"></div>
              <div class="button minimize"></div>
              <div class="button maximize"></div>
          </div>
          <div class="title">Chat</div>
      </div>
      <ul class="messages">
        <li v-for="chat in chatPublic">
          <strong>{{ chat.username }}</strong>: {{chat.message}}
        </li>
      </ul>
      <div class="bottom_wrapper clearfix">
        <form @submit="emitMessage">
          <div class="message_input_wrapper">
              <input class="message_input" placeholder="Type your message here..." v-model="textField" />
          </div>
          <div class="send_message">
              <input type="submit" value="Send">
          </div>
        </form>
      </div>
  </div>
  <div class="message_template">
      <li class="message">
          <div class="avatar"></div>
          <div class="text_wrapper">
              <div class="text"></div>
          </div>
      </li>
  </div>
  </div>
</template>

<script>
import jwt from 'jsonwebtoken'
export default {
  name: 'chatbox',
  props: ['id'],
  data () {
    return {
      textField: '',
      user: jwt.verify(window.localStorage.getItem('accessToken'), 'werefox')
    }
  },
  firebase () {
    return {
      chatPublic: this.$db.ref('rooms').child(this.id).child('chatPublic')
    }
  },
  methods: {
    emitMessage (e) {
      e.preventDefault()
      if (this.textField.trim() !== '') {
        this.$db.ref('rooms').child(this.id).child('chatPublic').push({
          username: this.user.username,
          message: this.textField
        })
        this.textField = ''
      }
    }
  }
}
</script>
