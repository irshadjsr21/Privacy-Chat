<template>
  <div>
    <v-card class="mx-auto mb-8">
      <v-card-title>
        Connected users
      </v-card-title>
      <v-card-text>
        <div class="text--primary">
          <h4 v-if="me">You: {{ me }}</h4>
          <ol v-if="users">
            <li v-for="user of users" :key="user._id">{{ user.name }}</li>
          </ol>
        </div>
      </v-card-text>
    </v-card>

    <v-card class="mx-auto">
      <v-card-title>
        Add your friends to the chat
      </v-card-title>
      <v-card-text>
        <div class="text--primary">
          <div class="text-center mb-4">
            Share the chat id or link with your friends
          </div>

          <div class="text-center mb-2 font-weight-bold subtitle-1 copy-border">
            {{ `${url}/join?chat=${chatId}` }}
          </div>

          <div class="text-center mb-2 title">
            OR
          </div>

          <div class="text-center font-weight-bold subtitle-1 copy-border">
            {{ chatId }}
          </div>
        </div>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['chatId', 'users', 'me'],

  data() {
    return {
      url: ''
    };
  },

  mounted() {
    this.url = document.location.origin;
  }
};
</script>

<style scoped>
.copy-border {
  border: 1px dashed black;
}
</style>