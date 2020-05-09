<template>
  <div class="pa-2 grey lighten-2 chatContainer">
    <div class="chatMessages"></div>
    <div class="chatInputContainer">
      <div class="chatInput">
        <div class="chatText">
          <input name="message" type="text" placeholder="Type a message" />
        </div>
        <div cols="2" class="chatBtn">
          <v-btn color="primary">Send</v-btn>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.chatContainer {
  height: 500px;
  position: relative;
}

.chatInputContainer {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
}

.chatInput {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15px;
}

.chatText {
  width: 100%;
  margin-right: 10px;
}

.chatText input {
  width: 100%;
  background-color: white;
  padding: 10px;
  border-radius: 4px;
}
</style>
