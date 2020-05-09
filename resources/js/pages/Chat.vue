<template>
  <div>
    <navbar></navbar>
    <v-container class="mt-8 card elevation-12">
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
              <chat-details></chat-details>
            </v-col>
            <v-col xl="8" lg="8" md="8" sm="12" xs="12" cols="12">
              <chat-container></chat-container>
            </v-col>
          </v-row>
          <!-- Card content end -->
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import Navbar from '../components/Navbar';
import ChatContainer from '../components/ChatContainer';
import ChatDetails from '../components/ChatDetails';

export default {
  components: { Navbar, ChatContainer, ChatDetails },
};
</script>

<style lang="css" scoped>
.card {
  background-color: #fff;
  color: rgba(0, 0, 0, 0.87);
  border-radius: 4px;
}
</style>
