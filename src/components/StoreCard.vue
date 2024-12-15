<template>
<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 mb-5">
                <figure class="effect-ming tm-video-item">
                    <img :src="storebanner" alt="Image" class="img-fluid" height="250" width="400"/>
                    <figcaption class="d-flex align-items-center justify-content-center">
                        <h3>{{ storename }}</h3><router-link :to="`/stores/${id}`">{{ storename }}</router-link>
                    </figcaption>                    
                </figure>
                <div class="d-flex justify-content-between tm-text-gray">
                    <span class="tm-text-gray-light">{{storeaddress}}</span>
                    <span>{{category}}</span>
                </div>
            </div> 
</template>
<script>
export default{
    props: ["id","storename", "storeaddress", "storelogo", "storebanner", "storeurl","category"],
};
</script>