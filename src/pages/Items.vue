<template>
  <Hero/>
  <Item/>
</template>

<script>
import Hero from '@/components/Hero.vue';
import Item from '@/components/Item.vue';

export default {
  name: 'App',
  components: {
    Hero,
    Item
  }
}
</script>
