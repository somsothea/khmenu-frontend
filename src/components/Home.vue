<template>
<div class="container-fluid tm-container-content tm-mt-60">
        <div class="row mb-4">
            <h2 class="col-6 tm-text-primary">
                New Stores
            </h2>
        </div>
        <div class="row tm-mb-90 tm-gallery">
                <StoreCard v-for="(store, index) in stores.slice(0, 8)"
                    :key="index"
                    :id="store._id"
                    :storename="store.storename"
                    :storeaddress="store.storeaddress"
                    :storebanner="store.storebanner"
                    :storeurl="store.storeurl"
                    :category="store.category">
                </StoreCard>
        </div> <!-- row -->
        <div class="row mb-4">
            <h2 class="col-6 tm-text-primary">
                New Items
            </h2>
        </div>
        <div class="row tm-mb-90 tm-gallery">
            <ItemCard v-for="(item, index) in items.slice(0, 8)"
                    :key="index"
                    :id="item._id"
                    :title="item.title"
                    :description="item.description"
                    :price="item.price"
                    :storeid="item.storeid"  
                    :itemimage="item.filename"
                    :category="item.category">
            </ItemCard>
        </div> <!-- row -->
    </div> <!-- container-fluid, tm-container-content -->
</template>
<script>
import StoreCard from '@/components/StoreCard.vue';
import ItemCard from '@/components/ItemCard.vue';
import axios from "axios";

export default({
    components: {
        StoreCard,
        ItemCard,
    },
    data() {
        return{stores:[],items:[]
        };
    },
    async created(){
        const storeurl= "/v1/stores";
        const itemurl= "/v1/items";
        try {
            //promise and async
            const store_response = await axios.get(storeurl);
            const stores = store_response.data.slice(0, 12);
            this.stores = stores;
            const item_response = await axios.get(itemurl);
            const items = item_response.data.slice(0, 12);
            this.items = items;
        } 
        catch (error) 
        {
            console.log(error);
        }
    }
    
});

</script>