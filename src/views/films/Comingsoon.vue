<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了"
      @load="onLoad" loading-text="努力加载中..." :immediate-check="false" >
      <van-cell v-for="item in movieList" :key="item.filmId" @click="handleChangePage(item.filmId)" >
        <img :src="item.poster" :alt="item.name" />
        <div class="content">
          <h5>{{ item.name }}<span>{{ item.filmType.name }}</span></h5>
          <p>主演：{{ item.actors | actorsFilter }}</p>
          <p>上映日期 ：{{ item.premiereAt|timeFifter2}} </p>
        </div>
        <div class="btn">
          <van-button plain type="primary" :hairline="true" class="bt"  color="#ff5f16">预购</van-button>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>
<script>
import Vue from "vue";
import axios from "axios";
import moment from 'moment'
Vue.filter("actorsFilter", (prv) => {
  if (prv === undefined) {
    return "暂无主演";
  }
  return prv.reduce((prv, item) => (prv += item.name + " "), "");
});
Vue.filter("timeFifter2", (prv) => {
  moment.locale('zh-cn'); 
 const i= moment(prv * 1000).format("e");
 const arr =['周一','周二','周三','周四','周五','周六','周日']
 const date = moment(prv * 1000).format("MMMDo");
  return arr[i]+' '+date
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
      url: "https://m.maizuo.com/gateway?cityId="+this.$store.state.cityId+"&pageNum=1&pageSize=10&type=2&k=8740397",
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
        url: `https://m.maizuo.com/gateway?cityId=${this.$store.state.cityId}&pageNum=${this.current}&pageSize=10&type=2&k=8740397`,
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
      margin-bottom: .1rem;
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

