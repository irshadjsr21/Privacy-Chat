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
              label="Team ID"
              name="team"
              prepend-icon="group"
              type="text"
            />
          </v-form>
        </v-card-text>
        <v-card-actions class="d-flex justify-center pb-8 flex-column">
          <v-btn color="primary" @click="onJoin">Join</v-btn>
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
  methods: {
    onJoin() {
      console.log('Join');
    },
  },
};
</script>
