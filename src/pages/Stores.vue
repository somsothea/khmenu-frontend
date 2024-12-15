<template>
  <Hero/>
  <Stores/>
</template>

<script>
import Hero from '@/components/Hero.vue';
import Stores from '@/components/Store.vue';

export default {
  name: 'App',
  components: {
    Hero,
    Stores
  }
}
</script>
