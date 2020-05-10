<template>
  <div>
    <navbar></navbar>
    <centered class="pt-10">
      <v-card class="elevation-12">
        <v-card-title>
          Create a Chat
        </v-card-title>
        <v-card-text>
          <v-form @submit.prevent="createChat">
            <v-text-field
              label="Enter your name"
              name="name"
              prepend-icon="person"
              type="text"
              v-model="name"
              :error="error"
            />
            <div class="d-flex justify-center">
              <v-btn color="primary" type="submit" large>Create</v-btn>
            </div>
          </v-form>
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
  data() {
    return {
      name: '',
      error: false,
    };
  },

  methods: {
    createChat() {
      this.error = false;
      if (this.name) {
        this.$router.push('/chat/new?name=' + this.name);
      } else {
        this.error = true;
      }
    },
  },
};
</script>
