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
          <div class="text-center">
            Share your chat id or the link with your friends
          </div>

          <div class="text-center">{{ chatId }}</div>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn text color="deep-purple accent-4">
          Copy Chat ID
        </v-btn>
        <v-btn text color="deep-purple accent-4">
          Copy Chat Link
        </v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
export default {
  props: ['chatId', 'users', 'me'],
};
</script>
