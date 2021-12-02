<template>
  <div>
    <!-- 路由link组件 -->
    <tab-bar v-show="this.$store.state.tabBarShow"></tab-bar>

    <!--写一个路由容器（本质就是slot插槽的改进封装）  -->
    <!-- 路由表文件里约定的路由一旦匹配上，他就会显示路由对应的组件 -->
    <!-- 添加路由切换过度效果：
        在路由的mate中定义了层级,在切换路由时判断用户是进入哪一层页面,
        如果用户进入更高层级那么做前进动画,
        如果用户退到低层级那么做后退动画. [遇到一个bug：动画添加成功但是swiper里的图片大小切换页面后会变化！]-->
    <!-- <transition :name="transitionName"> -->
      <router-view></router-view>
    <!-- </transition> -->
  </div>
</template>
<script>
import tabBar from "@/components/TabBar";
export default {
  data() {
    return {
      transitionName: "",
    };
  },
  components: {
    tabBar,
  },
  // watch: {
  //   //使用watch 监听$route的变化
  //   $route(to, from) {
  //     //如果to的meta里面标识值大于from的,判断为前进状态,反之则为后退状态
  //     if (to.meta.transitionPage > from.meta.transitionPage) {
  //       //设置动画名称
  //       this.transitionName = "left";
  //     } else {
  //       this.transitionName = "right";
  //     }
  //   },
  // },
};
</script>
<style lang="scss" >
* {
  margin: 0;
  padding: 0;
}
body {
  font-size: 0.13rem;
  color: #797d82;
}
ul,
li {
  list-style: none;
}
a {
  text-decoration: none;
  color: #797d82;
}
</style>
