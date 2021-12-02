<template>
  <div class="swiper-container" :class="swiperName"  :style="{width: '100%','max-height': '2.67rem'}">
    <div class="swiper-wrapper" >
      <slot></slot>
    </div>
  </div>
</template>
<script>
import Swiper from "swiper/bundle";
import "swiper/swiper-bundle.css";
export default {
  props: {
    slidesPerView: { type: Number, default: 3 },
    swiperName:{type:String ,default:'lee'},
  },
  mounted() {
    new Swiper('.'+this.swiperName, {
      slidesPerView: this.slidesPerView,
      spaceBetween: 10,
      freeMode: true,
    });
  },
};
</script>