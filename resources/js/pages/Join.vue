<template>
  <div>
    <navbar></navbar>
    <centered class="pt-10">
      <v-card class="elevation-12">
        <v-card-title>
          Join a Chat
        </v-card-title>
        <v-card-text>
          <v-form>
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
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8 flex-column">
          <v-btn color="primary" @click="joinChat">Join</v-btn>
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
    };
  },

  methods: {
    joinChat() {
      this.error = false;
      if (this.name) {
        this.$router.push(`/chat/${this.chatId}?name=${this.name}`);
      } else {
        this.error = true;
      }
    },
  },
};
</script>
