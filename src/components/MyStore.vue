<template>
  <div class="container-lg">
    <!-- Store's Profile -->
  <div class="row">
  <div class="col-12">
    <h1 class="text-center">Store's Profile</h1>
    <div v-if="store" class="card shadow-sm">
      <div class="card-body">
        <div class="row">
          <!-- Left Column -->
          <div class="col-md-6">
            <p><strong>Store Name: </strong> {{ store.storename }}</p>
            <p><strong>Store Public URL: </strong> {{ store.storeurl }}</p>
            <p><strong>Description: </strong> {{ store.storedescription }}</p>
            <p><strong>Contact: </strong> {{ store.storecontact }}</p>
            <p><strong>Telegram/Link: </strong> {{ store.storetelegram }}</p>
            <p><strong>Address: </strong> {{ store.storeaddress }}</p>
            <p><strong>Category: </strong> {{ store.category }}</p>
            <p><strong>Store Logo: </strong><br>
              <img :src="getImageUrl(store.storelogo)" alt="Store Logo" class="img-fluid" style="max-height: 100px;">
            </p>
          </div>

          <!-- Right Column -->
          <div class="col-md-6">

            <p><strong>Store Banner: </strong><br>
              <img :src="getImageUrl(store.storebanner)" alt="Store Banner" class="img-fluid" style="max-width: 100%;">
            </p>
            <p><strong>Created Date: </strong> {{ formatDate(store.createdDate) }}</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Loading State -->
    <div v-else class="text-center mt-3">
      <p>Loading store data...</p>
    </div>
  </div>
</div>


    <!-- Store's Items -->
    <div class="row mt-5">
      <div class="col-12 d-flex justify-content-between align-items-center">
        <h1>Store's Items</h1>
        <button class="btn btn-success" @click="showAddModal = true">Add New Item</button>
      </div>
      <div v-if="items.length" class="row g-4 mt-3">
        <div v-for="item in items" :key="item._id" class="col-md-4">
          <div class="card h-100 shadow-sm">
            <img :src="getImageUrl(item.filename)" class="card-img-top" alt="Item Image">
            <div class="card-body">
              <h5 class="card-title">{{ item.title }}</h5>
              <p><strong>Price:</strong> ${{ item.price }}</p>
              <p><strong>Description:</strong> {{ item.description }}</p>
              <p><strong>Category:</strong> {{ item.category }}</p>
              <button class="btn btn-danger mt-2" @click="deleteItem(item._id)">Delete</button>
            </div>
          </div>
        </div>
      </div>
      <div v-else class="text-center mt-3">
        <p>No items found for this store.</p>
      </div>
    </div>

    <!-- Add Item Modal -->
    <div v-if="showAddModal" class="modal d-block" tabindex="-1">
      <div class="modal-dialog modal-dialog-scrollable">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Add New Item</h5>
            <button type="button" class="btn-close" @click="showAddModal = false"></button>
          </div>
          <div class="modal-body">
            <form @submit.prevent="addItem">
              <div class="mb-3">
                <label for="title" class="form-label">Title</label>
                <input v-model="newItem.title" type="text" id="title" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="price" class="form-label">Price</label>
                <input v-model="newItem.price" type="number" id="price" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="category" class="form-label">Category</label>
                <input v-model="newItem.category" type="text" id="category" class="form-control" required>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">Description</label>
                <textarea v-model="newItem.description" id="description" class="form-control" rows="3" required></textarea>
              </div>
              <div class="mb-3">
                <label for="file" class="form-label">Upload Image</label>
                <input type="file" id="file" class="form-control" @change="handleFileUpload">
              </div>
              <button type="submit" class="btn btn-primary w-100">Add Item</button>
            </form>
          </div>
        </div>
      </div>
    </div>
    <br/>
  </div>
</template>
<script>
import axiosInstance from '@/axios/axios.js';
import { getImageUrl } from '@/utils/imageHelper';

export default {
  data() {
    return {
      store: null, // Store data
      items: [], // Store's items
      showAddModal: false, // Show or hide the add item modal
      newItem: {
        title: '',
        price: '',
        category: '',
        description: '',
        file: null, // File to be uploaded
      },
    };
  },
  methods: {
    getImageUrl,
    async fetchStoreData() {
      const storeId = this.$route.params.id;
      try {
        const storeResponse = await axiosInstance.get(`/mystores/${storeId}`);
        this.store = storeResponse.data;

        const itemsResponse = await axiosInstance.get(`/myitems/store/${storeId}`);
        this.items = itemsResponse.data.docs.map(item => ({
          ...item,
          imageUrl: this.getImageUrl(item.filename),
        }));
      } catch (error) {
        console.error('Error fetching data:', error.response?.data || error.message);
      }
    },
    async addItem() {
      try {
        const storeId = this.$route.params.id;
        const userId = this.store.userid; // Replace with the actual user ID

        // Upload file if a file is selected
        let uploadedFile = null;
        if (this.newItem.file) {
          const formData = new FormData();
          formData.append('file', this.newItem.file);
          const uploadResponse = await axiosInstance.post('/files/upload-single', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
          });
          uploadedFile = uploadResponse.data.file.filename;
        }
        // Create payload with uploaded file URL or manual filename
        const payload = {
          title: this.newItem.title,
          price: this.newItem.price,
          category: this.newItem.category,
          description: this.newItem.description,
          filename: uploadedFile, // This should contain the filename returned by the upload
          storeid: storeId,
          userid: userId,
        };
        const response = await axiosInstance.post('/myitems', payload);
        await this.fetchStoreData();
        this.showAddModal = false;
        this.newItem = {
          title: '',
          price: '',
          category: '',
          description: '',
          file: null,
          filename: uploadedFile || null,  // Assign the uploaded filename here
        };
      } catch (error) {
        console.error('Error adding item:', error.response?.data || error.message);
      }
    },
    async deleteItem(itemId) {
      try {
        await axiosInstance.delete(`/myitems/${itemId}`);
        this.items = this.items.filter(item => item._id !== itemId);
      } catch (error) {
        console.error('Error deleting item:', error.response?.data || error.message);
      }
    },
    handleFileUpload(event) {
      this.newItem.file = event.target.files[0];
    },
    formatDate(dateString) {
      const options = { year: 'numeric', month: 'long', day: 'numeric' };
      return new Date(dateString).toLocaleDateString(undefined, options);
    },
  },
  created() {
    this.fetchStoreData();
  },
};
</script>

<style>
.modal {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.modal-dialog-scrollable {
  max-height: 90%;
}
</style>

