<template>
  <div>
    <!-- 使用vant的list列表加载功能实现拉倒底部进行加载下页 ,(但很多情况下都有一个bug ，从列表切换到详情页后，在详情页
    拖动出现滚动条拉到底，再返回列表页，list列表会判断已经拉到底了直接触发onLoad函数！这时mounted里的Ajax异步数据还没回来，
    'total'数据的总数的值还没被附上值，就会出现数据总数默认为0的值和列表总数都为0相等的情况,finished直接被设置被true，就出现
    无法再去获取数据列表的情况。处理方法就是：设置finished时增加 &&this.total!==0 的判断)-->
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
      loading-text="努力加载中..."
      :immediate-check="false"
    >
      <!--不使用声明型导航 <router-link :to="'/detail'">{{item.msg}}</router-link> 改用以下函数式导航-->
      <van-cell
        v-for="item in movieList"
        :key="item.filmId"
        @click="handleChangePage(item.filmId)"
      >
        <img :src="item.poster" :alt="item.name" />
        <div class="content">
          <h5>
            {{ item.name }}<span>{{ item.filmType.name }}</span>
          </h5>
          <p :class="{ isshow: !item.grade }">
            观众评分 <span class="ping">{{ item.grade }}</span>
          </p>
          <p>主演：{{ item.actors | actorsFilter }}</p>
          <p>{{ item.nation }} | {{ item.runtime }}分钟</p>
        </div>
        <div class="btn">
          <van-button
            plain
            type="primary"
            :hairline="true"
            class="bt"
            color="#ff5f16"
            >购票</van-button
          >
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
Vue.filter("actorsFilter", (prv) => {
  if (prv === undefined) {
    return "暂无主演";
  }
  return prv.reduce((prv, item) => (prv += item.name + " "), "");
});
export default {
  data() {
    return {
      movieList: [],
      loading: false,
      finished: false,
      current: 1,
      total: 0,
    };
  },
  mounted() {
    axios({
      url: "https://m.maizuo.com/gateway?cityId="+this.$store.state.cityId+"&pageNum=1&pageSize=10&type=1&k=4457345",
      headers: {
        "X-Host": "mall.film-ticket.film.list",
        "X-Client-Info":
          '{"a":"3000","ch":"1002","v":"5.0.4","e":"16332850131319517032546305","bc":"310100"}',
      },
    }).then((res) => {
      this.movieList = res.data.data.films;
      this.total = res.data.data.total;
    });
  },

  methods: {
    handleChangePage(i) {
      //   编程式导航js写法
      //   window.location.href='#/detail'
      //   编程式导航vue中的写法this.$router表示路由对象
      //也就是之前路由表导出的new VueRouter({routes: routes})到mian.js里的那个router对象。里面有个push方法。
      // this.$router.push(`/detail/${i}`)
      // 以上是通过路径跳转，我们也可以通过命名路由跳转：
      this.$router.push({
        name: "myDetail",
        params: { myid: i },
      });
    },
    onLoad() {
      if (this.movieList.length === this.total && this.total !== 0) {
        this.finished = true;
        return;
      }
      this.current++;
      axios({
        url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=1&k=4457345`,
        headers: {
          "X-Host": "mall.film-ticket.film.list",
          "X-Client-Info":
            '{"a":"3000","ch":"1002","v":"5.0.4","e":"16332850131319517032546305","bc":"310100"}',
        },
      }).then((res) => {
        this.movieList = [...this.movieList, ...res.data.data.films];
        this.loading = false;
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.van-list {
  padding-left: 0.15rem;
}
.van-cell {
  position: relative;
  overflow: hidden;
  padding: 0.15rem 0.15rem 0.15rem 0;
  border-bottom: 0.5px solid #ddd;
  img {
    float: left;
    width: 0.66rem;
    margin-right: 0.15rem;
  }
  .content {
    width: 2.09rem;
    font-size: 0.13rem;
    float: left;
    color: #797d82;
    h5 {
      width: 100%;
      font-size: 0.16rem;
      font-weight: normal;
      color: #333;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      height: 0.22rem;
      line-height: 0.22rem;
      span {
        margin-left: 0.05rem;
        margin-top: -0.03rem;
        height: 0.14rem;
        line-height: 14px;
        display: inline-block;
        vertical-align: middle;
        background: #d2d6dc;
        font-size: 0.09rem;
        color: #fff;
        padding: 0 0.02rem;
        border-radius: 0.02rem;
      }
    }
    p {
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      line-height: 0.24rem;
    }
  }
  .btn {
    position: absolute;
    width: 0.5rem;
    top: 50%;
    right: 0%;
    font-size: 0.13rem;
    transform: translateY(-50%);
    .bt {
      width: 0.5rem;
      height: 0.25rem;
      font-size: 0.12rem;
      padding: 0;
    }
  }
}
.isshow {
  visibility: hidden;
}
.ping {
  color: #ffb232;
  font-size: 0.14rem;
}
</style>

