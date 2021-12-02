<template>
  <div class="container" ref="container">
    <slot></slot>
  </div>
</template>
<script>
//Vue的 <transition> 组件是实现不了元素高度过渡的，所以我们可以自己封装一个高度过渡组件。
//组件的原理是：使用原生的 CSS3  transition 属性，在改变元素的高度的同时会有过渡效果。
//这里有个注意点，显示的时候为什么元素的高度要赋值为 offsetHeight 的高度，而不能设置成 auto？
//原因是 CSS3  transition 属性不支持 height 为 auto 的过渡!

export default {
  props: { show: { type: Boolean, default: true } },
  data() {
    return {
      height: 0,
    };
  },
  mounted() {
    this.$nextTick().then(() => {
      this.height = this.$refs.container.offsetHeight;
      this.$refs.container.style.height = this.show ? `${this.height}px` : 0;
    });
  },
  watch: {
    show(newVal) {
      this.$refs.container.style.height = newVal ? `${this.height}px` : 0;
    },
  },
};
</script>
<style scoped>
.container {
  transition: height .5s linear;
  overflow: hidden;
}
</style>


