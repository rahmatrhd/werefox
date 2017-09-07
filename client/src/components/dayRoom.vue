<template>
  <div class="dayroom">
    <div class="row room-wrap">
      <h2>Room</h2>
      <div class="chat-room col-sm-12 col-md-9">
        <chatbox />
      </div>
      <div class="right-sidebar col-sm-12 col-md-3">
        <h4>User List</h4>
        <ul class="media-list">
          <li class="media">
            <div class="media-left">
              <a href="#" style="background-style: #fdb418">
                <img class="media-object" src="../assets/thumbnail.png" alt="">
              </a>
            </div>
            <div class="media-body">
              <h4 class="media-heading">Username</h4>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import chatbox from '@/components/Chatbox'
export default {
  name: 'dayroom ',
  comopnents: {
    chatbox
  }
}
</script>
