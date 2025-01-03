<template>
  <div class="container-fluid tm-container-content tm-mt-60">
    <div class="row mb-4">
      <h2 class="col-12 tm-text-primary">{{ store?.storename || 'Store Details' }}</h2>
    </div>
    <div class="row tm-mb-90">            
      <div class="col-xl-8 col-lg-7 col-md-6 col-sm-12">
        <img :src="getImageUrl(store?.storebanner)" alt="Store Banner" class="img-fluid" v-if="store?.storebanner" >
        <p v-else>No banner available</p>
      </div>
      <div class="col-xl-4 col-lg-5 col-md-6 col-sm-12">
        <div class="tm-bg-gray tm-video-details">
          <div class="text-center mb-5">
            <img :src="getImageUrl(store?.storelogo)" alt="Store Logo" class="img-fluid" v-if="store?.storelogo" :height="120" :width="120">
            <p v-else>No logo available</p>
          </div>
          <div class="mb-4">
            <h5 class="tm-text-gray-dark mb-3">Description</h5>
            <p>{{ store?.storedescription || 'No description available' }}</p>
          </div>                    
          <div class="mb-4">
            <h5 class="tm-text-gray-dark mb-3">Address</h5>
            <p>{{ store?.storeaddress || 'No address available' }}</p>
          </div>
          <div>
            <h5 class="tm-text-gray-dark mb-3">Contact</h5>
            <p>{{ store?.storecontact || 'No contact available' }}</p>
          </div>
          <div>
            <h5 class="tm-text-gray-dark mb-3">Telegram / Social Link</h5>
            <p>{{ store?.storetelegram || 'No social link available' }}</p>
          </div>
          <div class="text-center mb-5">
            <QRCode :value="appURL + `stores/` + storeurl" />
            <p>Scan to visit the store</p>
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
                :storeid="item.storeid"       
                :category="item.category">
      </ItemCard>     
    </div> <!-- row -->
  </div> <!-- container-fluid, tm-container-content -->
</template>

<script>
import { useRoute } from 'vue-router';
import ItemCard from '@/components/ItemCard.vue';
import axios from "axios";
import { getImageUrl } from '@/utils/imageHelper';
import QRCode from '@chenfengyuan/vue-qrcode';
const appURL = process.env.VUE_APP_DOMAIN_NAME;

export default {
  components: { ItemCard, QRCode },
  data() {
    const route = useRoute(); // Use route for accessing params
    return {
      appURL,
      items: [],
      storeurl: route.params.storeurl || null, // Store URL from route params
      store: null, // Store details
    };
  },
  async created() {
    try {
      let storeResponse = null;

      // Fetch store details using storeurl
      if (this.storeurl) {
        try {
          storeResponse = await axios.get(`/v1/stores/url/${this.storeurl}`);
          this.store = storeResponse.data;
        } catch (urlError) {
          console.warn("Failed to fetch store by URL. Trying with store ID...");
        }
      }

      // If no store data, try fetching by storeid
      if (!this.store && this.storeid) {
        try {
          storeResponse = await axios.get(`/v1/stores/${this.storeid}`);
          this.store = storeResponse.data;
        } catch (idError) {
          console.error("Failed to fetch store by ID:", idError);
        }
      }

      // Fetch related items if store data exists
      if (this.store && this.store._id) {
        try {
          const itemsResponse = await axios.get(`/v1/items/store/${this.store._id}`);
          this.items = itemsResponse.data;
        } catch (itemsError) {
          console.error("Failed to fetch items for the store:", itemsError);
        }
      } else {
        console.warn("No store data found.");
      }
    } catch (error) {
      console.error("Unexpected error in fetching data:", error);
    }
  },
  methods: {
    getImageUrl,
  },
};
</script>
