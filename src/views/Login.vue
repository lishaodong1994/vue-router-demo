<template>
  <div>
    <button @click="handleLogin">login</button>
  </div>
</template>
<script>
export default {
  methods: {
    handleLogin() {
      setTimeout(() => {
        localStorage.setItem("token", "后端返回的token字段");
        // this.$router.push('/center')
        // 也可以通过带过来的query字段 跳转回原先来的路由
        this.$router.push(this.$route.query.aaa);
      }, 1000);
    },
  },
};
</script>