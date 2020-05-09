<template>
  <div class="pa-2 grey lighten-2 chatContainer">
    <div class="chatMessages">
      <div v-if="messages" class="pa-4">
        <div
          v-for="(message, index) of messages"
          :key="index"
          :class="
            message.isAuto
              ? 'message message-auto'
              : message.userId === userId
              ? 'message message-me'
              : 'message'
          "
        >
          <div
            :class="
              message.isAuto
                ? 'd-flex flex-column align-center'
                : message.userId === userId
                ? 'd-flex flex-column align-end'
                : 'd-flex flex-column'
            "
            :style="{ width: '85%' }"
          >
            <div
              :class="
                message.isAuto
                  ? 'messageText pa-2'
                  : message.userId === userId
                  ? 'messageText pa-2 blue white--text'
                  : 'messageText pa-2 white'
              "
            >
              <div>
                {{ message.text }}
              </div>
            </div>
            <div class="d-flex message-hint">
              <div
                v-if="message.userId !== userId && !message.isAuto"
                class="mr-2"
              >
                {{ message.from }}
              </div>
              <div v-if="message.time">{{ message.time | formatTime }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="chatInputContainer">
      <form class="chatInput" @submit.prevent="onSend">
        <div class="chatText">
          <input
            rows="1"
            v-model="message"
            name="message"
            type="text"
            placeholder="Type a message"
          />
        </div>
        <div cols="2" class="chatBtn">
          <v-btn color="primary" type="submit">Send</v-btn>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  props: ['messages', 'userId'],
  data() {
    return {
      message: '',
    };
  },

  methods: {
    onSend() {
      if (this.message) {
        this.$emit('message', this.message);
        this.message = '';
      }
    },
  },

  filters: {
    formatTime(time) {
      if (time) {
        return moment(time).format('hh:mm:ss A');
      }

      return '';
    },
  },
};
</script>

<style scoped>
.chatMessages {
  overflow-y: scroll;
  height: 100%;
}

.chatContainer {
  height: 500px;
  display: flex;
  flex-direction: column;
}

.chatInputContainer {
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

.message {
  justify-content: flex-start;
  margin-bottom: 8px;
  display: flex;
}

.message.message-auto {
  justify-content: center;
  text-align: center;
}

.message.message-me {
  justify-content: flex-end;
}

.message.message-me {
  text-align: right;
}

.messageText {
  padding: 8px;
  width: fit-content;
  border-radius: 4px;
}

.message-hint {
  font-size: 0.8em;
  opacity: 0.8;
}

@media (max-width: 768px) {
  .chatInput {
    padding: 0;
  }
}
</style>
