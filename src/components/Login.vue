<template>
    <div class="container-fluid tm-mt-60">
        <div class="row tm-mb-50">
            <div class="col-lg-4 col-12 mb-5">
                             
            </div>
            <div class="col-lg-4 col-12 mb-5">
                <main class="form-signin w-100 m-auto">
                  <form @submit.prevent="handleLogin">
      <div class="form-group">
        <label for="username">Username:</label>
        <input
          type="text"
          id="username"
          v-model="username"
          placeholder="Enter your username"
          required
        />
      </div>
      <div class="form-group">
        <label for="password">Password:</label>
        <input
          type="password"
          id="password"
          v-model="password"
          placeholder="Enter your password"
          required
        />
      </div>
      <button type="submit" :disabled="isLoading">
        {{ isLoading ? "Logging in..." : "Login" }}
      </button>
      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>
    </form>
                </main>
            </div>
          </div>
        </div>
               

</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
      isLoading: false,
      errorMessage: "",
    };
  },
  methods: {
    async handleLogin() {
      this.isLoading = true;
      this.errorMessage = "";

      try {
        const response = await axios.post("/v1/auth/login", {
          email: this.username,
          password: this.password,
        });

        const { accessToken, refreshToken } = response.data;

        // Store tokens in localStorage
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        alert("Login successful!");
        this.$router.push("/myaccount"); // Navigate to a dashboard or home page
      } catch (error) {
        this.errorMessage =
          error.response?.data?.message || "Login failed. Try again.";
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.login-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 15px;
}
label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}
input {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 4px;
}
button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}
button:disabled {
  background-color: #aaa;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>
