<template>
  <div>
    <hello-world></hello-world>
    <router-link to="/about">About us</router-link>
  </div>
</template>

<script>
import HelloWorld from '../components/HelloWorld';

export default {
  components: {
    HelloWorld,
  },
};
</script>
