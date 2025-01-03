<template>
  <Header/>
  <router-view></router-view>
  <Footer/>

</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';
import AOS from 'aos';

export default {
  created ( ) {
        AOS.init()
    },
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>