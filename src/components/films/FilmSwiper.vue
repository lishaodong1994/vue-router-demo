<template>
  <div class="swiper-container lee">
    <div class="swiper-wrapper">
      <slot></slot>
    </div>
    <div class="swiper-pagination"></div>
  </div>
</template>
<script>
// 开终端下载 npm i swiper .   import进来使用
import Swiper from 'swiper/bundle' //相当于导入swiper全部的js
import 'swiper/swiper-bundle.css'  //导入swiper的全部css
export default {
  props:{
    loop:{type:Boolean,default:true}
  },
  mounted() {
    //Do not use 'new' for side effects [eslint报错] eslint规定new必须赋值给变量。 （no-new）
    // xx is assigned a value but never used [eslint报错] xx被赋值了但是没有被使用。 
    // 这些错误可以在.eslintrc.js里配置忽略 
    // 使用swiper时注意版本swiper7写法已改，我们使用sweiper6的版本
    // 注意：new时元素要使用.swiper-container 避免错误
    new Swiper(".swiper-container", {
      pagination: {
        el: ".swiper-pagination",
      },
      loop: this.loop,
      autoplay: { delay: 2000, disableOnInteraction: false },
    });
  },
};
</script>
<style lang="scss" scoped>
.lee{
  width: 100%;
  height: 2.1rem;
}
</style>