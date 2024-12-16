<template>
    <div class="container mt-5">
      <h2>Register</h2>
      <form @submit.prevent="registerUser">
        <div class="mb-3">
          <label for="firstname" class="form-label">First Name</label>
          <input
            type="text"
            id="firstname"
            v-model="form.firstname"
            class="form-control"
            placeholder="Enter your first name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="lastname" class="form-label">Last Name</label>
          <input
            type="text"
            id="lastname"
            v-model="form.lastname"
            class="form-control"
            placeholder="Enter your last name"
            required
          />
        </div>
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <input
            type="email"
            id="email"
            v-model="form.email"
            class="form-control"
            placeholder="Enter your email"
            required
          />
        </div>
        <div class="mb-3">
          <label for="password" class="form-label">Password</label>
          <input
            type="password"
            id="password"
            v-model="form.password"
            class="form-control"
            placeholder="Enter your password"
            required
          />
        </div>
        <div class="mb-3">
          <label for="confirmPassword" class="form-label">Confirm Password</label>
          <input
            type="password"
            id="confirmPassword"
            v-model="form.confirmPassword"
            class="form-control"
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" class="btn btn-primary">Register</button>
        <div v-if="message" class="mt-3 alert" :class="{'alert-success': success, 'alert-danger': !success}">
          {{ message }}
        </div>
      </form>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        form: {
          firstname: '',
          lastname: '',
          email: '',
          password: '',
          confirmPassword: ''
        },
        message: '',
        success: false
      };
    },
    methods: {
      async registerUser() {
        try {
          // Send data to your API
          const response = await axios.post('http://localhost:4000/v1/auth/sign-up', this.form);
          this.success = true;
          this.message = 'Registration successful!';
          setTimeout(() => {
            this.$router.push('/myaccount');
          }, 1500);
        } catch (error) {
          this.success = false;
          this.message = error.response?.data?.message || 'An error occurred during registration.';
        }
      }
    }
  };
  </script>
  
  <style>
  /* Optional styling for the form */
  .container {
    max-width: 500px;
  }
  </style>
  