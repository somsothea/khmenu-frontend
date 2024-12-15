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
              <h3 class="tm-text-gray-dark mb-3">Address</h3>
              <p>{{ store?.storeaddress || 'No address available' }}</p>
            </div>
            <div>
              <h3 class="tm-text-gray-dark mb-3">Contact</h3>
              <p>{{ store?.contact || 'No contact available' }}</p>
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
    const { id } = useRoute().params; // Extract store ID from route params
    return {
      items: [],
      id,       // Store ID from route
      store: null, // Store details
    };
  },
  async created() {
    const storeUrl = `/v1/stores/${this.id}`; // Dynamic URL for store details
    const itemsUrl = `/v1/items/store/${this.id}`; // Filter items by store ID

    try {
      // Fetch store details
      const storeResponse = await axios.get(storeUrl);
      this.store = storeResponse.data; // Set store data

      // Fetch items related to this store
      const itemsResponse = await axios.get(itemsUrl);
      this.items = itemsResponse.data; // Set items data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  },
};
</script>

