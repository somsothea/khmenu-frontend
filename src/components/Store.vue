<template>
    <div class="tm-hero d-flex justify-content-center align-items-center">
        <form class="d-flex tm-search-form" @submit.prevent="performSearch">
            <input
                class="form-control tm-search-input"
                type="search"
                placeholder="Search Store"
                aria-label="Search"
                v-model="searchQuery"
            />
            <button class="btn btn-outline-success tm-search-btn" type="submit">
                <i class="fas fa-search"></i>
            </button>
        </form>
    </div>
    <div class="container-fluid tm-container-content tm-mt-60">
        <div class="row mb-4">
            <h2 class="col-6 tm-text-primary">Latest Stores</h2>
        </div>
        <div class="row tm-mb-90 tm-gallery">
            <StoreCard
                v-for="(store, index) in stores"
                :key="index"
                :id="store._id"
                :storename="store.storename"
                :storeaddress="store.storeaddress"
                :storebanner="store.storebanner"
                :storeurl="store.storeurl"
                :category="store.category"
            />
        </div>
    </div>
</template>

<script>
import StoreCard from '@/components/StoreCard.vue';
import axios from "axios";

export default {
    components: { StoreCard },
    data() {
        return {
            stores: [],     // To hold the filtered list of stores
            allStores: [],  // To hold the complete list of stores fetched by default
            searchQuery: '', // To bind the user's search input
        };
    },
    async created() {
        await this.fetchStores(); // Fetch all stores on page load
    },
    methods: {
        async fetchStores() {
            const url = "/v1/stores";
            try {
                const response = await axios.get(url);
                this.allStores = response.data; // Store all fetched stores
                this.stores = response.data;   // Display all stores by default
            } catch (error) {
                console.error("Error fetching stores:", error);
            }
        },
        performSearch() {
            if (!this.searchQuery) {
                // If no search query, display all stores
                this.stores = this.allStores;
            } else {
                // Filter stores based on the search query
                const query = this.searchQuery.toLowerCase();
                this.stores = this.allStores.filter(store =>
                    store.storename.toLowerCase().includes(query) ||
                    store.storeaddress.toLowerCase().includes(query)
                );
            }
        },
    },
};
</script>

