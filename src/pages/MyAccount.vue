<template>
  <Hero/>
  <MyAccount/>
</template>

<script>
import Hero from '@/components/Hero.vue';
import MyAccount from '@/components/MyAccount.vue';

export default {
  name: 'App',
  components: {
    Hero,
    MyAccount
  }
}
</script>
