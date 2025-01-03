
<template>
    <Hero/>
    <MyStore/>
  </template>
  
  <script>
  import Hero from '@/components/Hero.vue';
  import MyStore from '@/components/MyStore.vue';
  
  export default {
    name: 'App',
    components: {
      Hero,
      MyStore
    }
  }
  </script>
  