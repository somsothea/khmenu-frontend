<template>
  <Hero/>
  <Contact/>
</template>

<script>
import Hero from '@/components/Hero.vue';
import Contact from '@/components/Contact.vue';

export default {
  name: 'App',
  components: {
    Hero,
    Contact
  }
}
</script>
