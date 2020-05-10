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
            Share the chat id with your friends
          </div>

          <input
            type="text"
            :value="chatId"
            disabled
            ref="chatId"
            class="d-none"
          />

          <div class="text-center font-weight-bold subtitle-1">
            {{ chatId }}
          </div>
        </div>
      </v-card-text>
      <v-card-actions class="d-flex justify-space-between">
        <v-btn @click="copyChatId" text color="deep-purple accent-4">
          Copy Chat ID
        </v-btn>
        <!-- <v-btn text color="deep-purple accent-4">
          Copy Chat Link
        </v-btn> -->
      </v-card-actions>
    </v-card>

    <v-snackbar v-model="showSuccessToast" :timeout="2000">
      Chat ID copied.
      <v-btn color="blue" text @click="showSuccessToast = false">
        Close
      </v-btn>
    </v-snackbar>

    <v-snackbar v-model="showErrorToast" :timeout="2000">
      Cannot copy Chat ID.
      <v-btn color="blue" text @click="showErrorToast = false">
        Close
      </v-btn>
    </v-snackbar>
  </div>
</template>

<script>
export default {
  props: ['chatId', 'users', 'me'],

  data() {
    return {
      showSuccessToast: false,
      showErrorToast: false,
    };
  },

  methods: {
    copyChatId() {
      try {
        const copyText = this.$refs.chatId;
        if (!copyText) {
          throw new Error();
        }
        if (copyText.focus && copyText.select && document.execCommand) {
          /* Select the text field */
          copyText.focus();
          copyText.select();
          copyText.setSelectionRange(0, 99999); /*For mobile devices*/

          /* Copy the text inside the text field */
          document.execCommand('copy');
          this.showSuccessToast = true;
        } else {
          throw new Error('No method found.');
        }
      } catch (error) {
        console.log(error);
        this.showErrorToast = true;
      }
    },
  },
};
</script>
