<template>
  <div class="container mt-5">
    <center><h2>Register</h2></center>
    <form @submit.prevent="registerUser">
      <div class="mb-">
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
        <label for="password" class="form-label">Password (at least 8 characters)</label>
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
      <div class="mb-3">
        <label for="captcha" class="form-label">Captcha: {{ captcha.question }}</label>
        <input
          type="text"
          id="captcha"
          v-model="captcha.userAnswer"
          class="form-control"
          placeholder="Enter the answer"
          required
        />
        <div v-if="captcha.error" class="text-danger mt-2">{{ captcha.error }}</div>
      </div>
      <div class="mb-3"><center>
      <button
        type="submit"
        class="btn btn-primary"
        :disabled="!captcha.isValid"
      >
        Register
      </button>
      &nbsp;
      <button type="button" class="btn btn-primary" @click="goToLogin">
        Login
      </button></center>
    </div>
      <div
        v-if="message"
        class="mt-3 alert"
        :class="{'alert-success': success, 'alert-danger': !success}"
      >
        {{ message }}
      </div>
    </form>
    <br />
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
        confirmPassword: '',
      },
      captcha: {
        question: '',
        correctAnswer: null,
        userAnswer: '',
        error: '',
        isValid: false,
      },
      message: '',
      success: false,
    };
  },
  mounted() {
    this.generateCaptcha();
  },
  methods: {
    goToLogin() {
      this.$router.push('/login');
    },
    generateCaptcha() {
      const num1 = Math.floor(Math.random() * 10);
      const num2 = Math.floor(Math.random() * 10);
      this.captcha.question = `What is ${num1} + ${num2}?`;
      this.captcha.correctAnswer = num1 + num2;
      this.captcha.isValid = false;
      this.captcha.userAnswer = '';
      this.captcha.error = '';
    },
    validateCaptcha() {
      if (parseInt(this.captcha.userAnswer) === this.captcha.correctAnswer) {
        this.captcha.isValid = true;
        this.captcha.error = '';
      } else {
        this.captcha.isValid = false;
        this.captcha.error = 'Incorrect CAPTCHA. Please try again.';
      }
    },
    async registerUser() {
      this.validateCaptcha();
      if (!this.captcha.isValid) {
        this.message = 'Please solve the CAPTCHA correctly.';
        this.success = false;
        return;
      }
      try {
        const response = await axios.post('/v1/auth/sign-up', this.form);
        this.success = true;
        this.message = 'Registration successful!';
        setTimeout(() => {
          this.$router.push('/login');
        }, 1500);
      } catch (error) {
        this.success = false;
        this.message = error.response?.data?.message || 'An error occurred during registration.';
      }
    },
  },
  watch: {
    'captcha.userAnswer': function () {
      this.validateCaptcha();
    },
  },
};
</script>

<style>
.container {
  max-width: 500px;
}
</style>
