<template>
  <div class="container-fluid tm-container-content tm-mt-60">
    <div class="row mb-4">
      <h2 class="col-12 tm-text-primary">{{ store?.storename || 'Store Details' }}</h2>
    </div>
    <div class="row tm-mb-90">            
      <div class="col-xl-8 col-lg-7 col-md-6 col-sm-12">
        <img :src="store?.storebanner || 'https://picsum.photos/600/400?shop'" alt="Image" class="img-fluid">
      </div>
      <div class="col-xl-4 col-lg-5 col-md-6 col-sm-12">
        <div class="tm-bg-gray tm-video-details">
          <div class="text-center mb-5">
            <img :src="store?.storelogo || 'https://via.placeholder.com/100'" alt="Logo" class="img-fluid">
          </div>
          <div class="mb-4">
            <h3 class="tm-text-gray-dark mb-3">Description</h3>
            <p>{{ store?.storedescription || 'No description available' }}</p>
          </div>                    
          <div class="mb-4">
            <h3 class="tm-text-gray-dark mb-3">Address</h3>
            <p>{{ store?.storeaddress || 'No address available' }}</p>
          </div>
          <div>
            <h3 class="tm-text-gray-dark mb-3">Contact</h3>
            <p>{{ store?.storecontact || 'No contact available' }}</p>
          </div>
          <div>
            <h3 class="tm-text-gray-dark mb-3">Telergam / Social Link</h3>
            <p>{{ store?.storetelegrm || 'No socaial link available' }}</p>
          </div>
        </div>
      </div>
    </div>
    <div class="row mb-4">
      <h2 class="col-12 tm-text-primary">
        Store's Items
      </h2>
    </div>
    <div class="row mb-3 tm-gallery">
      <ItemCard v-for="(item, index) in items"
                :key="index"
                :id="item._id"
                :title="item.title"
                :description="item.description"
                :itemimage="item.filename" 
                :price="item.price"     
                :category="item.category">
      </ItemCard>     
    </div> <!-- row -->
  </div> <!-- container-fluid, tm-container-content -->
</template>

<script>
import { useRoute } from 'vue-router';
import ItemCard from '@/components/ItemCard.vue';
import axios from "axios";

export default {
  components: { ItemCard },
  data() {
    const { storeurl } = useRoute().params; // Extract store URL from route params
    return {
      items: [],
      storeurl, // Store URL from route
      store: null, // Store details
    };
  },
  async created() {
    try {
      // Fetch store details using storeurl
      const storeResponse = await axios.get(`/v1/stores/url/${this.storeurl}`);
      this.store = storeResponse.data;

      if (this.store && this.store._id) {
        // Fetch items related to this store using its ID
        const itemsResponse = await axios.get(`/v1/items/store/${this.store._id}`);
        this.items = itemsResponse.data;
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};
</script>
