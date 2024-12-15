<template>
<div class="container-fluid tm-container-content tm-mt-60">
        <div class="row mb-4">
            <h2 class="col-6 tm-text-primary">
                Latest Items
            </h2>
            <div class="col-6 d-flex justify-content-end align-items-center">
                <form action="" class="tm-text-primary">
                    Page <input type="text" value="1" size="1" class="tm-input-paging tm-text-primary"> of 200
                </form>
            </div>
        </div>
        <div class="row tm-mb-90 tm-gallery">
        	
                <ItemCard v-for="(item, index) in items"
                    :key="index"
                    :id="item._id"
                    :title="item.title"
                    :description="item.description"
                    :price="item.price"     
                    :category="item.category">
                </ItemCard>
    
                
        </div> <!-- row -->
        <div class="row tm-mb-90">
            <div class="col-12 d-flex justify-content-between align-items-center tm-paging-col">
                <a href="javascript:void(0);" class="btn btn-primary tm-btn-prev mb-2 disabled">Previous</a>
                <div class="tm-paging d-flex">
                    <a href="javascript:void(0);" class="active tm-paging-link">1</a>
                    <a href="javascript:void(0);" class="tm-paging-link">2</a>
                    <a href="javascript:void(0);" class="tm-paging-link">3</a>
                    <a href="javascript:void(0);" class="tm-paging-link">4</a>
                </div>
                <a href="javascript:void(0);" class="btn btn-primary tm-btn-next">Next Page</a>
            </div>            
        </div>
    </div> <!-- container-fluid, tm-container-content -->
</template>
<script>
import ItemCard from '@/components/ItemCard.vue';
import axios from "axios";

export default({
    components: {ItemCard},
    data() {
        return{items:[],
        };
    },
    async created(){

        const url= "/v1/items";

        try {
        //promise and async
        const response = await axios.get(url);
        const items = response.data;
        console.log(items);
        this.items = items;
        } 
        catch (error) 
        {
            console.log(error);
        }
    }
    
});

</script>
