<template>
  <Hero/>
  <Home/>
</template>

<script>
import Hero from '@/components/Hero.vue';
import Home from '@/components/Home.vue';

export default {
  name: 'App',
  components: {
    Hero,
    Home
  }
}
</script>