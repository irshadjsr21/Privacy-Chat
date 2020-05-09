<template>
  <div>
    <navbar></navbar>

    <div class="d-flex mt-12 justify-center" v-if="isLoading">
      <v-progress-circular
        :size="100"
        color="primary"
        indeterminate
      ></v-progress-circular>
    </div>

    <div class="d-flex mt-12 justify-center" v-else-if="fatalError">
      <h1>
        Some error occured
      </h1>
    </div>

    <v-container class="mt-8 card elevation-12" v-else>
      <v-row>
        <v-col>
          <!-- Card content -->

          <!-- Card Heading -->
          <v-row>
            <v-col><h2 class="text-center">Welcome to your chat</h2></v-col>
          </v-row>
          <!-- Card Heading end -->

          <v-row>
            <v-col xl="4" lg="4" md="4" sm="12" xs="12" cols="12">
              <chat-details
                :users="users"
                :me="name"
                :chatId="chatId"
              ></chat-details>
            </v-col>
            <v-col xl="8" lg="8" md="8" sm="12" xs="12" cols="12">
              <chat-container
                @message="sendMessage"
                :userId="userId"
                :messages="messages"
              ></chat-container>
            </v-col>
          </v-row>
          <!-- Card content end -->
        </v-col>
      </v-row>
    </v-container>

    <!-- <v-btn @click="runDemo">Demo</v-btn> -->
  </div>
</template>

<script>
import io from 'socket.io-client';

import Navbar from '../components/Navbar';
import ChatContainer from '../components/ChatContainer';
import ChatDetails from '../components/ChatDetails';

export default {
  components: { Navbar, ChatContainer, ChatDetails },
  data() {
    return {
      socket: undefined,
      isConnected: false,
      isLoading: true,
      fatalError: false,
      chatId: undefined,
      name: undefined,
      messages: [],
      users: [],
      userId: undefined,
    };
  },

  mounted() {
    try {
      if (!(this.$route && this.$route.params && this.$route.params.id)) {
        throw new Error('No ID found');
      } else if (!(this.$route.query && this.$route.query.name)) {
        throw new Error('No Name found');
      }

      const id = this.$route.params.id;
      const name = this.$route.query.name;
      this.name = name;
      const metaTag = document.querySelector("meta[name='csrf-token']");
      if (!metaTag || !metaTag.content) {
        throw new Error('No csrf token tag');
      }

      this.socket = io({
        transportOptions: {
          polling: {
            extraHeaders: {
              'xsrf-token': metaTag.content,
            },
          },
        },
      });
      this.isConnected = true;
      this.socket.on('newUser', this.handleNewUser);
      this.socket.on('userDisconnect', this.handleDisconnectedUser);
      this.socket.on('message', this.handleMessage);
      if (id === 'new') {
        this.createChat();
      } else {
        this.joinChat(id);
      }
    } catch (error) {
      console.log(error);
      this.isConnected = false;
      this.isLoading = false;
      this.fatalError = true;
    }
  },

  beforeDestroy() {
    if (this.socket) {
      this.socket.emit('disconnect');
    }
  },

  deactivated() {
    if (this.socket) {
      this.socket.emit('disconnect');
    }
  },

  methods: {
    createChat() {
      if (this.isConnected) {
        this.socket.emit('create', { name: this.name }, (err, data) => {
          if (err) {
            console.log(err);
            this.fatalError = true;
          } else {
            this.chatId = data.chatId;
            this.userId = data.userId;
            this.messages.push({
              isAuto: true,
              text: `Welcome to your new chat ${this.name}.`,
            });
          }
          this.isLoading = false;
        });
      }
    },

    joinChat(id) {
      if (this.isConnected) {
        this.socket.emit(
          'join',
          { name: this.name, chatId: id },
          (err, data) => {
            if (err) {
              console.log(err);
              this.fatalError = true;
            } else {
              this.chatId = data.chatId;
              this.users = data.users;
              this.userId = data.userId;
              this.messages.push({
                isAuto: true,
                text: `Welcome to the chat ${this.name}.`,
              });
            }
            this.isLoading = false;
          },
        );
      }
    },

    handleNewUser(data) {
      this.users.push(data.user);
      this.messages.push({
        isAuto: true,
        text: `${data.user.name} just joined.`,
      });
    },

    handleDisconnectedUser(data) {
      if (data.user && data.user.userId) {
        this.users = this.users.filter(
          (elem) => elem.userId !== data.user.userId,
        );
      }

      this.messages.push({
        isAuto: true,
        text: `${data.user.name} just left.`,
      });
    },

    handleMessage(data) {
      if (data) {
        this.messages.push(data);
      }
    },

    sendMessage(message) {
      if (this.isConnected) {
        this.socket.emit(
          'send',
          { text: message, chatId: this.chatId },
          (error) => {
            if (error) {
              console.log(error);
            }
          },
        );
      }
    },

    runDemo() {
      this.socket.emit('demo', this.chatId);
    },
  },
};
</script>

<style lang="css" scoped>
.card {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
}
</style>
