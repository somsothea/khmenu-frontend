<template>
  <Hero/>
  <Login/>
</template>

<script>
import Hero from '@/components/Hero.vue';
import Login from '@/components/Login.vue';

export default {
  name: 'App',
  components: {
    Hero,
    Login
  }
}
</script>
