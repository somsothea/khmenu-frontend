<template>
  <Header/>
  <router-view></router-view>
  <Footer/>
</template>

<script>
import Footer from '@/components/Footer.vue';
import Header from '@/components/Header.vue';

export default {
  name: 'App',
  components: {
    Header,
    Footer
  }
}
</script>
<style>
.tm-item {
  background: linear-gradient(135deg, #f0f0f0, #ffffff); /* Subtle gradient for modern look */
  border: 1px solid #ddd; /* Light border for structure */
  border-radius: 8px; /* Rounded corners */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); /* Soft shadow */
  overflow: hidden; /* Ensure content stays within rounded edges */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Smooth hover effect */
}

.tm-item:hover {
  transform: translateY(-5px); /* Slight lift on hover */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2); /* Enhanced shadow on hover */
}

.tm-item img {
  width: 100%; /* Ensure images are responsive */
  height: auto;
  border-bottom: 1px solid #ddd; /* Separator between image and content */
}

.tm-item h3 {
  font-size: 1.2rem; /* Adjust title size */
  font-weight: 600; /* Bold title */
  color: #333; /* Darker text color for readability */
  margin: 15px 10px 5px; /* Consistent spacing */
}

.tm-item p {
  font-size: 0.9rem; /* Smaller text for descriptions */
  color: #666; /* Muted color for descriptions */
  margin: 0 10px 15px; /* Padding below */
}

.tm-item .btn {
  display: block;
  text-align: center;
  background-color: #007bff; /* Attractive button color */
  color: #fff; /* Button text color */
  padding: 10px;
  margin: 10px;
  border: none;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease, color 0.3s ease;
}

.tm-item .btn:hover {
  background-color: #0056b3; /* Darker shade for hover */
  color: #fff;
}
</style>