<template>
  <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 mb-5 tm-item">
    <figure class="effect-ming tm-video-item" @click="showLightbox">
      <div class="image-container">
        <img :src="getImageUrl(itemimage)" alt="Image" class="img-fluid">
      </div>
      <figcaption class="d-flex align-items-center justify-content-center">         
        <h5>{{ title }}</h5>
      </figcaption>                    
    </figure>
    <div class="d-flex justify-content-between tm-text-gray">
      <span class="tm-text-gray-light">{{ description }}</span>
      <span>{{ price }} $</span>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="isLightboxVisible" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-content" @click.stop>
        <img :src="getImageUrl(itemimage)" alt="Image" class="img-fluid lightbox-image">
        <div class="lightbox-caption">
          <div class="row">
            <div class="col-12 col-md-6 mb-2">
              <p>{{ title }}</p>
            </div>
            <div class="col-12 col-md-6 mb-2">
              <p>{{ description }}</p>
            </div>
            <div class="col-12 col-md-6 mb-2">
              <a v-if="store?.storecontact" :href="`tel:${store.storecontact}`"><p>Tel: {{ store.storecontact }}</p></a>
            </div>
            <div class="col-12 col-md-6 mb-2">
              <a v-if="store?.storetelegram" :href="store.storetelegram" target="_blank"><p>Telegram / Link: {{ store.storetelegram }}</p></a>
            </div>
            <div class="col-12 mb-2">
              <h4><router-link :to="`/stores/${store?.storeurl}`">Visit Store</router-link></h4>
            </div>
          </div>
        </div>
        <button class="lightbox-close" @click="closeLightbox">✖</button>
      </div>
    </div>
  </div>
</template>

<script>
import { getImageUrl } from '@/utils/imageHelper';
import axios from "axios";

export default {
  props: ["id", "price", "title", "category", "page", "description", "cover", "itemimage", "storeid"],
  data() {
    return {
      isLightboxVisible: false,
      store: null,  // Add store as null initially
    };
  },
  async mounted() {
    // Fetch store data when the component is mounted
    await this.fetchStoreData();
  },
  methods: {
    async fetchStoreData() {
      const storeId = this.storeid;  // Use the prop 'storeid' passed to the component
      try {
        const storeResponse = await axios.get(`/v1/stores/${storeId}`);
        this.store = storeResponse.data;  // Set store data after fetching
        console.log('Store data:', this.store);  // Check the fetched data in console
      } catch (error) {
        console.error('Error fetching store data:', error.response?.data || error.message);
      }
    },
    getImageUrl,
    showLightbox() {
      this.isLightboxVisible = true;
    },
    closeLightbox() {
      this.isLightboxVisible = false;
    },
  },
};
</script>

<style>
/* Lightbox Overlay */
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: flex-start; /* Align content at the top */
  z-index: 1000;
  overflow: auto; /* Allow scrolling for the entire modal */
  padding: 20px; /* Add padding for better appearance on smaller screens */
  box-sizing: border-box;
}

/* Lightbox Content */
.lightbox-content {
  position: relative;
  max-width: 100%;
  max-height: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
}

/* Lightbox Image Scrollable */
.lightbox-image {
  max-width: 100%;
  height: auto;
  max-height: 80vh; /* Limit image height to fit in the modal */
  object-fit: contain; /* Maintain aspect ratio */
  overflow-y: auto; /* Enable vertical scrolling for large images */
}

/* Caption */
.lightbox-caption {
  width: 100%;
  color: white;
  margin-top: 20px;
  padding: 15px;
  background-color: rgba(0, 0, 0, 0.6);
  box-sizing: border-box;
}

/* Close Button */
.lightbox-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
}

/* Image Container */
.image-container {
  height: 250px;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #b3b3b3;
}

.image-container img {
  height: 100%;
  width: auto;
}
</style>
