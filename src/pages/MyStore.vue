<template>
    <Hero/>
    <MyStores/>
  </template>
  
  <script>
  import Hero from '@/components/Hero.vue';
  import Stores from '@/components/MyStore.vue';
  
  export default {
    name: 'App',
    components: {
      Hero,
      MyStores
    }
  }
  </script>
  