<template>
  <Hero/>
  <SignUp/>
</template>

<script>
import Hero from '@/components/Hero.vue';
import SignUp from '@/components/SignUp.vue';

export default {
  name: 'App',
  components: {
    Hero,
    SignUp
  }
}
</script>
