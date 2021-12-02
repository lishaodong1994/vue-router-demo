<template>
    <div class="detailHeader">
      <slot></slot>
    </div>
</template>
<script>
export default {
  methods: {
   
  },
};
</script>
<style lang="scss" scoped>
.detailHeader {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 0.44rem;
  line-height: 0.44rem;
  text-align: center;
  font-size: 0.17rem;
  background-color: #fff;
  color: #191a1b;
  transition-property: opacity ,visibility;
  transition-duration: 0.8s; 
}
</style>