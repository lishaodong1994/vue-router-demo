<template>
  <ul class="filmheaderbox">
    <!-- 这种给router-link指定tag的方式更加自由！ -->
    <router-link to="/films/nowplaying" custom v-slot="{ navigate, isActive }">
      <li @click="navigate">
        <span :class="isActive ? 'active' : ''">正在热映</span>
      </li>
    </router-link>
    <router-link to="/films/comingsoon" custom v-slot="{ navigate, isActive }">
      <li @click="navigate">
        <span :class="isActive ? 'active' : ''"> 即将上映</span>
      </li>
    </router-link>
  </ul>
</template>
<style lang="scss" scoped>
.filmheaderbox {
    // 使用css来做吸顶功能   static | relative | absolute | sticky | fixed | inherit（继承父的）
  position: sticky;
  top: 0;
  z-index: 100;
  
  display: flex;
  height: 0.49rem;
  line-height: 0.49rem;
  border-bottom: 1px solid #ededed;
  background-color: #fff;
  li {
    flex: 1;
    text-align: center;
    font-size: 0.14rem;
    cursor: pointer;
    span {
      display: inline-block;
      height: 100%;
    }
  }
  .active {
    color: #ff5f16;
    border-bottom: 2px #ff5f16 solid;
  }
}
</style>