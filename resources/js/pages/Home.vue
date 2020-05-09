<template>
  <div>
    <navbar></navbar>
    <centered class="pt-10">
      <v-card class="elevation-12">
        <v-card-title>
          Create a Chat
        </v-card-title>
        <v-card-text>
          <div class="d-flex justify-center">
            <v-btn color="primary" @click="createChat" x-large>Create</v-btn>
          </div>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8 flex-column">
          <router-link class="mt-4" to="/join">Join a Chat</router-link>
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
  methods: {
    createChat() {
      this.$router.push('/chat/new');
    },
  },
};
</script>
