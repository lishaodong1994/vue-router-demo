<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入影城名称"
        @cancel="onCancel"
      />
    </form>
    <ul class="box" v-if="value">
      <li v-for="item in filterList" :key="item.cinemaId">
        <div class="content">
          <p class="address1">{{ item.name }}</p>
          <p class="address2">{{ item.address }}</p>
        </div>
        <div class="tip">
          <b class="price"
            >￥<span>{{ item.lowPrice / 100 }}</span
            >起</b
          >
          <span>{{ "距离未知" }}</span>
        </div>
      </li>
      <div class="nomessage" v-if="value && filterList.length===0">
         <img src="@/assets/nomessage.png" alt="nomessage">
         <p>没有找到匹配的影院</p>
        <p class="tip">提示:仅支持收索'影院'，建议您检查输入的影院名是否有误?</p>
      </div>
    </ul>
    <div class="youWay" v-if="!value">
        <p>离你最近</p>
        <span v-for="(item,index) in way" :key="index">{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      value: "",
      way:['帕加尼激光影城(虹口店)','上海浙江电影院','上海黄浦电影院','上海和平影院','SFC上海影城(新世界店)',]
    };
  },
  mounted() {
    this.$store.state.cinemasData.length === 0 && this.$store.dispatch("getCinemasData");
    this.$store.commit('tabBarShow_false') //控制tabBar隐藏
  },
  destroyed(){
    this.$store.commit('tabBarShow_true') //控制tabBar显示
  },
  methods: {
    onCancel() {
      this.$router.back();
    },
  },
  computed:{
      filterList(){
          return this.$store.state.cinemasData.filter(item=>{
            return item.name.indexOf(this.value)!==-1||item.address.indexOf(this.value)!==-1
          })
      }
  }
};
</script>
<style lang="scss" scoped>
li {
  padding: 0.15rem;
  display: flex;
  font-size: 0.12rem;
  justify-content: space-between;
  border-bottom: 1px solid #ededed;
  .content {
    width: 2.2rem;
    .address1 {
      width: 100%;
      font-size: 0.15rem;
      height: 0.22rem;
      line-height: 0.22rem;
      margin-bottom: 0.05rem;
      color: #191a1b;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
    .address2 {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    }
  }
  .tip {
    width: 0.7rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .price {
      height: 0.22rem;
      line-height: 0.22rem;
      margin-bottom: 0.05rem;
      color: #ff5f16;
      font-weight: normal;
      span {
        font-size: 0.15rem;
      }
    }
  }
}
.youWay{
    padding: .15rem;
    p{
        margin-bottom: .15rem;
    }
    span{
        display: inline-block;
        margin: 0 .1rem .1rem 0;
        padding: .08rem .12rem;
        background-color: #f4f4f4;
        font-size: .13rem;
        color:#191a1b
    }
}
.nomessage{
    margin-top: .7rem;
    text-align: center;
    img{
        width: .9rem;
    }
    p.tip{
        padding: 0 22vw;
    }
}
</style>