<template>
    <div class="tm-hero d-flex justify-content-center align-items-center">
        <form class="d-flex tm-search-form" @submit.prevent="performSearch">
            <input
                class="form-control tm-search-input"
                type="search"
                placeholder="Search Item"
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
            <h2 class="col-6 tm-text-primary">Items</h2>
        </div>
        <div class="row tm-mb-90 tm-gallery">
            <ItemCard
                v-for="(item, index) in items"
                :key="index"
                :id="item._id"
                :title="item.title"
                :description="item.description"
                :price="item.price"
                :itemimage="item.filename"
                :storeid="item.storeid"
                :category="item.category"
            />
        </div>
    </div>
</template>

<script>
import ItemCard from '@/components/ItemCard.vue';
import axios from "axios";

export default {
    components: { ItemCard },
    data() {
        return {
            items: [], // Stores the items displayed
            allItems: [], // Stores all items fetched by default
            searchQuery: '', // Search input
        };
    },
    async created() {
        await this.fetchAllItems(); // Fetch all items on page load
    },
    methods: {
        async fetchAllItems() {
            try {
                const response = await axios.get('/v1/items');
                this.allItems = response.data; // Save all items
                this.items = response.data; // Display all items by default
            } catch (error) {
                console.error('Error fetching items:', error);
            }
        },
        performSearch() {
            if (!this.searchQuery) {
                // If the search query is empty, show all items
                this.items = this.allItems;
            } else {
                const query = this.searchQuery.toLowerCase();
                this.items = this.allItems.filter(item =>
                    item.title.toLowerCase().includes(query) ||
                    item.description.toLowerCase().includes(query)
                );
            }
        },
    },
};
</script>
