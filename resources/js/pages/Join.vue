<template>
  <div>
    <navbar></navbar>
    <centered class="pt-10">
      <v-card class="elevation-12">
        <v-card-title>
          <span v-if="queryChatId">Joining Chat from link</span>
          <span v-else>Join a Chat</span>
        </v-card-title>
        <v-card-text>
          <v-form
            @submit.prevent="joinChat"
            class="d-flex justify-center flex-column"
          >
            <v-text-field
              label="Enter your name"
              name="name"
              prepend-icon="person"
              type="text"
              v-model="name"
              :error="nameError"
            />
            <v-text-field
              label="Chat ID"
              name="team"
              prepend-icon="group"
              type="text"
              v-model="chatId"
              :error="chatIdError"
              v-if="!queryChatId"
            />
            <div class="d-flex justify-center">
              <v-btn color="primary" type="submit" large>Join</v-btn>
            </div>
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8 flex-column">
          <router-link class="mt-4" to="/">Create a Chat</router-link>
        </v-card-actions>
      </v-card>
    </centered>
  </div>
</template>

<script>
import Centered from '../components/Centered';
import Navbar from '../components/Navbar';

export default {
  components: { Centered, Navbar },
  data() {
    return {
      name: '',
      nameError: false,
      chatId: '',
      chatIdError: false,
      queryChatId: undefined,
    };
  },

  mounted() {
    if (this.$route && this.$route.query && this.$route.query.chat) {
      this.queryChatId = this.$route.query.chat;
    }
  },

  methods: {
    joinChat() {
      this.error = false;
      const chatId = this.queryChatId || this.chatId;
      if (this.name) {
        this.$router.push(`/chat/${chatId}?name=${this.name}`);
      } else {
        this.error = true;
      }
    },
  },
};
</script>
