<template>
<div class="col-xl-3 col-lg-4 col-md-6 col-sm-6 col-6 mb-5" data-aos="flip-left">
                <figure class="effect-ming tm-video-item">
                    <div class="image-container">
                    <img :src="getImageUrl(storebanner)" alt="Image" class="img-fluid" height="250" width="400"/>
                </div>
                    <figcaption class="d-flex align-items-center justify-content-center">
                        <h4>{{ storename }}</h4><router-link :to="`/stores/${storeurl}`">{{ storename }}</router-link>
                    </figcaption>                    
                </figure>
                <div class="d-flex justify-content-between tm-text-gray">
                    <span class="tm-text-gray-light">{{storeaddress}}</span>
                    <span>{{category}}</span>
                </div>
            </div> 
</template>
<script>
import { getImageUrl } from '@/utils/imageHelper';

export default{
    props: ["id","storename", "storeaddress", "storelogo", "storebanner", "storeurl", "category"],
    methods: {
    getImageUrl,
  },
};
</script>
<style>
.image-container {
    height: 250px; /* Set the desired height for all images */
    overflow: hidden; /* Hide any overflow outside the container */
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #b3b3b3; /* Optional: background color for empty spaces */
  }
  
  .image-container img {
    height: 100%; /* Make the image fill the container height */
    width: auto; /* Maintain aspect ratio */
  }
  </style>