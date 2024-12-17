<template>
  <div class="container mt-4">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">User's Profile</h1>
        <div v-if="user" class="card shadow-sm">
          <div class="card-body">
            <p><strong>ID:</strong> {{ user._id }}</p>
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>First Name:</strong> {{ user.firstname }}</p>
            <p><strong>Last Name:</strong> {{ user.lastname }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Account Type:</strong> {{ user.type }}</p>
            <p><strong>Permission:</strong> {{ user.permission }}</p>
            <p><strong>Created Date:</strong> {{ formatDate(user.createdDate) }}</p>
            <p> <button class="btn btn-danger" @click="logout">Logout</button></p>
          </div>
        </div>
        <div v-else class="text-center mt-3">
          <p>Loading user data...</p>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12">
        <h1 class="text-center">User's Stores</h1>
        <div v-if="stores.length" class="row g-4">
          <div v-for="store in stores" :key="store._id" class="col-md-4">
            <div class="card h-100 shadow-sm">
              <img :src="store.storebanner" class="card-img-top" alt="Store Banner">
              <div class="card-body">
                <div class="d-flex align-items-center mb-3">
                  <img :src="store.storelogo" class="rounded-circle me-3" alt="Store Logo" style="width: 50px; height: 50px;">
                  <h5 class="card-title mb-0">{{ store.storename }}</h5>
                </div>
                <p><strong>Address:</strong> {{ store.storeaddress }}</p>
                <p><strong>Category:</strong> {{ store.category }}</p>
                <p><strong>Created Date:</strong> {{ formatDate(store.createdDate) }}</p>
               
                <a :href="'/' + store.storeurl" class="btn btn-primary" target="_blank">Visit Store</a>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="text-center mt-3">
          <p>No stores found for this user.</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      user: null, // Holds user data
      stores: [], // Holds store data
    };
  },
  methods: {
    async fetchUserData() {
      try {
        // Get the accessToken from localStorage
        const accessToken = localStorage.getItem('accessToken');
        if (!accessToken) {
          throw new Error('Access token not found in local storage.');
        }

        // Make API request to fetch user data
        const response = await axios.get('v1/auth/me', {
          headers: {
            Authorization: `Bearer ${accessToken}`, // Include token in header
          },
        });

        // Bind user data
        this.user = response.data;

        // Fetch stores once user data is available
        this.fetchStores();
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
      }
    },
    async logout(){
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    this.user = null;
    this.$router.push('/login');
    },
    async fetchStores() {
      try {
        // Corrected string interpolation
        const response = await axios.get('/v1/mystores/user/${this.user._id}');
        console.log(this.user._id);
        // Bind stores data
        this.stores = response.data;
        console.log(this.response);
      } catch (error) {
        console.error('Error fetching stores:', error.response?.data || error.message);
      }
    },
    formatDate(dateString) {
      // Format ISO date to a readable format
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  created() {
    // Fetch user data when the component is created
    this.fetchUserData();
  },
};
</script>

<style scoped>
.container {
  font-family: Arial, sans-serif;
}
.card {
  border-radius: 10px;
  overflow: hidden;
}
.card-img-top {
  height: 150px;
  object-fit: cover;
}
.card-title {
  font-size: 1.25rem;
  font-weight: bold;
}
</style>
