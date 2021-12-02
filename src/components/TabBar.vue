<template>
  <div class="navbox">
    <!-- 路由的本质不过就是通过js控制localtion.href(这种方式称为：编程式导航) 
          或其他方式（如a的href,这种方式称为：声明式导航）改变href并检测值来决定显示哪个对应组件。 -->
    <!-- 
    <a href="/#/films">电影|</a> 
    <a href="/#/cinemas">演院|</a> 
    <a href="/#/center">我的</a><br> -->
    <!-- 点击a标签虽然修改路径最终也成功让路由容器显示成了对应的组件 -->
    <!-- 但是，我们仍发现一些问题：
    1.点击后a对应的a应该高亮（这个好实现，但我们直接通过修改路径，那么高亮也要和路径组件一一对应，这是个问题）
    2.对页面进行刷新，页面仍检测到当前路由，保留在当前路由组件显示及高亮。 
    -->
    <!-- 想要实现的话：我们必须对链接路径（的路由查照部分（hash部分））进行监听。
          ---浏览器提供了window.onhashchange=()=>{ }   
        这也是vue提供的路由组件的底层实现方案。我们不需要自己去实现这些功能，vuerouter已经提供了相应的方案：
    -->
    <!-- 本质就是封装了一个router-link组件并传入to属性和active-class属性。并留有插槽：方便拓展内容（组件标签里写内容）  -->
    <!-- router-link组件源码中props必定规定了接受to和active-class等属性并加以利用和操作。底层还是对a标签的进一步封装-->
    <!-- tag 正如vue的过度里面的tag效果一样，用于标签最终渲染成什么标签 -->
    <router-link to="/films" active-class="lee" tag="span" class="item">
      <van-icon name="video-o" class="icon" />
      <p>电影</p>
    </router-link>
    <router-link to="/cinemas" active-class="lee" tag="span" class="item">
      <van-icon name="play-circle-o"  class="icon"/>
      <p>演院</p>
    </router-link>
    <a href="/components/message.html" class="item">
      <van-icon name="comment-o"  class="icon" />
      <p>咨讯</p>
    </a>
    <router-link to="/center" active-class="lee" tag="span" class="item">
      <van-icon name="friends-o"  class="icon" />
      <p>我的</p>
    </router-link>
    <!-- [vue-router] <router-link>'s tag prop is deprecated and has been removed in Vue Router 4. 
        警告：在<router-link>传tag属性是Router3版本的写法 Router 4的写法改了(可拓展性更好但写法麻烦)：
        <router-link to="/films" custom v-slot="{navigate,isActive}">
          <span @click="navigate" :class="{lee:isActive}">电演</span>
        </router-link>
        <router-link to="/center" custom v-slot="{navigate,isActive}">
          <span @click="navigate" :class=" isActive?'lee':'' ">我的</span>
        </router-link>
      -->
  </div>
</template>
<script>
export default {};
</script>
<style lang="scss" scoped>
// 如果没有组件没传 active-class 则会使用下面这个默认类名
// .router-link-active{
//   background-color: skyblue;
// }
.lee {
  color: #ff5f16;
}
.navbox {
  display: flex;
  position: fixed;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.49rem;
  background-color: #fff;
  z-index: 100;
  .icon{
    margin-top: .05rem;
    font-size: .25rem;
  }
  .item {
    width: 25%;
    text-align: center;
    
    p {
      font-size: .12rem;
    }
  }
}
</style>