<template>
  <div class="center">
    Center
    <!-- <button @click="show=!show">切换</button>
    <heightChange :show="show">
      内容
    </heightChange> -->
    <!-- <input type="text" v-model="addU" /><button @click="add_user">add</button>
    <ul>
      <li v-for="item in list" :key="item.id">
        <img :src="item.img_url" alt="" />
        <span>{{ item.username }}</span>
        <button @click="del_user(item.id)">del</button>
      </li>
    </ul>
    <div class="fengyeqi">
      <van-pagination
        v-model="currentPage"
        :total-items="total"
        :show-page-size="3"
        @change="get_page_data"
        force-ellipses
      />
    </div> -->
  </div>
</template>
<script>
import heightChange from "@/components/HeightChange";
import { mockHttp } from "@/util/http.js";
import http from "@/util/http.js";

export default {
  components: {
    //heightChange,
  },
  data() {
    return {
      currentPage: 1,
      pagesize: 10,
      total: 1,
      show: true,
      list: [],
      addU: "",
    };
  },

  mounted() {
    // mockHttp.get(`/users?pagenum=1&pagesize=10`).then((res) => {
    //   console.log(res);
    //   this.total = res.data.data.total;
    //   this.list = res.data.data.users;
    // });
    http.get('/users').then(res=>{
      console.log(res);
    })
  },
  watch: {},
  methods: {
    // get_page_data() {
    //   mockHttp
    //     .get(`/users?pagenum=${this.currentPage}&pagesize=${this.pagesize}`)
    //     .then((res) => {
    //       this.list = res.data.data.users;
    //       this.total = res.data.data.total;
    //       console.log(res.data);
    //     });
    // },
    // add_user() {
    //   mockHttp({
    //     url: `/users`,
    //     method: "post",
    //     data: `?username=${this.addU}`,
    //   });
    //   this.get_page_data();
    // },
    // del_user(id) {
    //   //this.list = this.list.filter((item) => item.id !== id);
    //   mockHttp({
    //     url: `/users?id=${id}`,
    //     method: "DELETE",
    //   }).then(() => {
    //     this.get_page_data();
    //   });
    // },
  },
  //路由的生命周期:(效果同全局拦截和局部拦截)
  beforeRouterEnter(to, from, next) {
    if (localStorage.getItem("token")) {
      next();
    } else {
      next({ path: "login", query: { aaa: to.fullPath } });
    }
  },
};
</script>
<style scoped>
.center {
  padding-bottom: 0.89rem;
}
.fengyeqi {
  background-color: #fff;
  width: 100%;
  position: fixed;
  left: 0;
  bottom: 0.49rem;
  z-index: 229;
}
</style>