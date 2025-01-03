<template>
  <div class="container-lg">
    <div class="row">
      <div class="col-12">
        <h1 class="text-center">User's Profile</h1>
        <div v-if="user" class="card shadow-sm">
          <div class="card-body">
            <p><strong>Username:</strong> {{ user.username }}</p>
            <p><strong>First Name:</strong> {{ user.firstname }}</p>
            <p><strong>Last Name:</strong> {{ user.lastname }}</p>
            <p><strong>Email:</strong> {{ user.email }}</p>
            <p><strong>Account Type:</strong> {{ user.type }}</p>
            <p><strong>Permission:</strong> {{ user.permission }}</p>
            <p><strong>Created Date:</strong> {{ formatDate(user.createdDate) }}</p>
            <p><button class="btn btn-danger" @click="logout">Logout</button></p>
          </div>
        </div>
        <div v-else class="text-center mt-3">
          <p>Loading user data...</p>
        </div>
      </div>
    </div>

    <div class="row mt-5">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <h1 class="text-center">User's Stores</h1>
        <button class="btn btn-success" @click="openAddStoreModal">Add New Store</button>
      </div>
      <div v-if="stores.length" class="row g-4 mt-3">
        <div v-for="store in stores" :key="store._id" class="col-md-4">
          <div class="card h-100 shadow-sm">
            <img :src="getImageUrl(store.storebanner)" class="card-img-top" alt="Store Banner">
            <div class="card-body">
              <div class="d-flex align-items-center mb-3">
                <img :src="getImageUrl(store.storelogo)" class="rounded-circle me-3" alt="Store Logo" style="width: 50px; height: 50px;">
                &nbsp;<h5 class="card-title mb-0">{{ store.storename }}</h5>
              </div>
              <p><strong>Address:</strong> {{ store.storeaddress }}</p>
              <p><strong>Category:</strong> {{ store.category }}</p>
              <p><strong>Contact:</strong> {{ store.storecontact }}</p>
              <p><strong>Created Date:</strong> {{ formatDate(store.createdDate) }}</p>
              <center>
                <!-- <a :href="'/mystore/' + store._id" class="btn btn-primary" target="_blank">View Store</a> -->
                <router-link :to="`/mystore/${store._id}`" class="btn btn-primary">View Store</router-link>
                <div class="mt-3 text-center">
                  <QRCode :value="appURL + `stores/` + store.storeurl" />
                  <p>Scan to visit the store</p>
                </div>
              </center>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center mt-3">
        <p>No stores found for this user.</p>
      </div>
    </div>
    <br />
    <!-- Add Store Modal -->
    <div v-if="isAddStoreModalOpen" class="modal d-block" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Store</h5>
            <button type="button" class="btn-close" @click="closeAddStoreModal"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addStore">
              <div class="mb-3">
                <label for="storename" class="form-label">Store Name</label>
                <input v-model="newStore.storename" type="text" class="form-control" id="storename" required>
              </div>
              <div class="mb-3">
                <label for="storeaddress" class="form-label">Address</label>
                <input v-model="newStore.storeaddress" type="text" class="form-control" id="storeaddress" required>
              </div>
              <div class="mb-3">
                <label for="storelogo" class="form-label">Logo</label>
                <input @change="onFileChange($event, 'storelogoFile')" type="file" class="form-control" id="storelogo" accept="image/*" required>
              </div>
              <div class="mb-3">
                <label for="storebanner" class="form-label">Store Banner</label>
                <input @change="onFileChange($event, 'storebannerFile')" type="file" class="form-control" id="storebanner" accept="image/*" required>
              </div>

              <div class="mb-3">
                <label for="storeurl" class="form-label">Store URL  (ex: abcstore) </label>
                <input v-model="newStore.storeurl" type="text" class="form-control" id="storeurl" required>
              </div>
              <div class="mb-3">
                <label for="storedescription" class="form-label">Store Description</label>
                <input v-model="newStore.storedescription" type="text" class="form-control" id="storedescription" required>
              </div>
              <div class="mb-3">
                <label for="storecontact" class="form-label">Store Contact (ex: 010123456)</label>
                <input v-model="newStore.storecontact" type="text" class="form-control" id="storecontact" required>
              </div>
              <div class="mb-3">
                <label for="storetelegram" class="form-label">Store Telegram / Web (ex: https://fb.me/abcstore)</label>
                <input v-model="newStore.storetelegram" type="text" class="form-control" id="storetelegram">
              </div>
              <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <select v-model="newStore.category" class="form-control" id="category" required>
                <option value="" disabled>Select a category</option>
                <option v-for="(type, index) in storeTypes" :key="index" :value="type">
                  {{ type }}
                </option>
              </select>
              </div>
              <button type="submit" class="btn btn-primary">Add Store</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import QRCode from '@chenfengyuan/vue-qrcode';
import axiosInstance from '@/axios/axios.js';
import { getImageUrl } from '@/utils/imageHelper';
const appURL = process.env.VUE_APP_DOMAIN_NAME;

export default {
  components: { QRCode },
  data() {
    return {
      user: null, // Holds user data
      stores: [], // Holds store data
      appURL,
      isAddStoreModalOpen: false, // Controls modal visibility
      storeTypes: ["Restaurant","Street Foods","Online Store","Retail Store","Furniture","Home Decor","Electronic","Others"],
      newStore: {
        storename: '',
        storeaddress: '',
        storelogo: null,
        storebanner: null,
        storeurl: '',
        storedescription: '',
        storecontact: '',
        storetelegram: '',
        category: '',
      },
    };
  },
  methods: {
    getImageUrl,
    onFileChange(event, key) {
      const file = event.target.files[0];
      if (file) {
        console.log('Selected file:', file); // Debugging log
        this.newStore[key] = file; // Assign file to newStore
      } else {
        console.error('No file selected');
      }
    },
    async fetchUserData() {
      try {
        const response = await axiosInstance.get('auth/me');
        this.user = response.data;
        this.fetchStores();
      } catch (error) {
        console.error('Error fetching user data:', error.response?.data || error.message);
      }
    },
    async logout() {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.user = null;
      this.$router.push('/login');
    },
    async fetchStores() {
      try {
        const response = await axiosInstance.get(`mystores/user/${this.user._id}`);
        this.stores = response.data.docs;
        // Generate QR codes for each store
        for (const store of this.stores) {
          store.qrCode = await this.generateQRCode(store.storeurl);
        }
      } catch (error) {
        console.error('Error fetching stores:', error.response?.data || error.message);
      }
    },
    
    async addStore() {
      try {      
        // Ensure storelogoFile and storebannerFile are provided
        if (!this.newStore.storelogoFile) {
          throw new Error('Store logo file is required.');
        }
        if (!this.newStore.storebannerFile) {
          throw new Error('Store banner file is required.');
        }
        // Validate storecontact as a telephone number
        const phoneRegex = /^[+]?[\d\s()-]{7,20}$/; // Allows numbers, spaces, dashes, and optional country code
        if (!phoneRegex.test(this.newStore.storecontact)) {
          throw new Error('Invalid phone number format.');
        }
        // Validate storetelegram as a URL
        const urlRegex = /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/; // Basic URL pattern
        if (this.newStore.storetelegram && !urlRegex.test(this.newStore.storetelegram)) {
          throw new Error('Invalid URL format.');
        }

        // Upload the store logo and store banner
        const logoResponse = await this.uploadFile(this.newStore.storelogoFile);
        const bannerResponse = await this.uploadFile(this.newStore.storebannerFile);

        // Capture the filenames from the responses
        this.newStore.storelogo = logoResponse.data.file.filename;
        this.newStore.storebanner = bannerResponse.data.file.filename;

        // Prepare the store data payload
        const storePayload = {
          storename: this.newStore.storename,
          storeaddress: this.newStore.storeaddress,
          storelogo: this.newStore.storelogo,
          storebanner: this.newStore.storebanner,
          storeurl: this.newStore.storeurl,
          storedescription: this.newStore.storedescription,
          storecontact: this.newStore.storecontact,
          storetelegram: this.newStore.storetelegram,
          category: this.newStore.category,
          userid: this.user._id, // Add user ID if necessary
        };

        // Send the payload to the API
        const saveResponse = await axiosInstance.post('mystores', storePayload);
        console.log('Store saved successfully:', saveResponse.data);

        // Update the store list and close the modal
        this.stores.push(saveResponse.data);
        await this.fetchStores();
        this.closeAddStoreModal();
      } catch (error) {
        console.error('Error adding store:', error.response?.data || error.message);
      }
    },
    
    
    // Helper function to upload a file
    async uploadFile(file) {
      const formData = new FormData();
      formData.append('file', file);

      return await axiosInstance.post('/files/upload-single', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
    },

    async generateQRCode(url) {
      try {
        return await QRCode.toDataURL(url);
      } catch (error) {
        console.error('Error generating QR code:', error.message);
        return null;
      }
    },
    openAddStoreModal() {
      this.isAddStoreModalOpen = true;
      document.body.classList.add('modal-open'); // Disable body scrolling
    },
    closeAddStoreModal() {
      this.isAddStoreModalOpen = false;
      document.body.classList.remove('modal-open'); // Re-enable body scrolling
      this.resetNewStoreForm();
    },
    resetNewStoreForm() {
      this.newStore = {
        storename: '',
        storeaddress: '',
        storelogo: null,
        storebanner: null,
        storeurl: '',
        storedescription: '',
        storecontact: '',
        storetelegram: '',
        category: '',
      };
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  created() {
    this.fetchUserData();
  },
};
</script>

<style>
body.modal-open {
  overflow-y: hidden;
}

.container {
  font-family: Arial, sans-serif;
  padding: 0 15px;
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

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  overflow-y: auto; /* Enable scrolling within the modal */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1050;
}

.modal-dialog {
  max-width: 100%; /* Full width for small screens */
  margin: 0 15px; /* Add some margin for spacing */
}

.modal-content {
  border-radius: 10px;
  overflow: hidden;
}

@media (max-width: 768px) {
  .card {
    margin-bottom: 15px; /* Add spacing between cards */
  }

  .card .card-body {
    padding: 15px;
  }

  .modal-dialog {
    width: 100%; /* Ensure modal takes full width */
    margin: 10px; /* Slight margin on small screens */
  }
}

@media (max-width: 576px) {
  .card-title {
    font-size: 1rem; /* Adjust title size for smaller screens */
  }

  .card-img-top {
    height: 120px; /* Reduce image height for small screens */
  }

  .modal-dialog {
    margin: 5px; /* Minimal margin on very small screens */
  }
}
</style>
