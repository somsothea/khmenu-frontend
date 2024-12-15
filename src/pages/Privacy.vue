<template>
  <Hero/>
  <Privacy/>
</template>

<script>
import Hero from '@/components/Hero.vue';
import Privacy from '@/components/Privacy.vue';

export default {
  name: 'App',
  components: {
    Hero,
    Privacy,
  }
}
</script>
