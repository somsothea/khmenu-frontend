<template>
  <div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 mb-5 tm-item">
    <figure class="effect-ming tm-video-item" @click="showLightbox">
      <img :src="itemimage" alt="Image" class="img-fluid">
      <figcaption class="d-flex align-items-center justify-content-center">         
        <h3>{{ title }}</h3>
      </figcaption>                    
    </figure>
    <div class="d-flex justify-content-between tm-text-gray">
      <span class="tm-text-gray-light">{{ description }}</span>
      <span>{{ price }} $</span>
    </div>

    <!-- Lightbox Modal -->
    <div v-if="isLightboxVisible" class="lightbox-overlay" @click="closeLightbox">
      <div class="lightbox-content">
        <img :src="itemimage" alt="Image" class="img-fluid" width="100%">
        <div class="lightbox-caption">
          <h3>{{ title }}</h3>
          <p>{{ description }}</p>
        </div>
        <button class="lightbox-close" @click="closeLightbox">✖</button>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: ["id", "price", "title", "category", "page", "description", "cover","itemimage"],
  data() {
    return {
      isLightboxVisible: false, // State to control lightbox visibility
    };
  },
  methods: {
    showLightbox() {
      this.isLightboxVisible = true; // Show lightbox
    },
    closeLightbox() {
      this.isLightboxVisible = false; // Hide lightbox
    },
  },
};
</script>
<style scoped>
.lightbox-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.lightbox-content {
  position: relative;
  max-width: 90%;
  max-height: 80%;
  text-align: center;
}

.lightbox-content img {
  max-width: 100%;
  max-height: 100%;
  border-radius: 10px;
}

.lightbox-caption {
  margin-top: 15px;
  color: white;
}

.lightbox-close {
  position: absolute;
  top: 10px;
  right: 10px;
  background: transparent;
  border: none;
  color: white;
  font-size: 1.5rem;
  cursor: pointer;
}
</style>
