<template>
  <div>
    <van-nav-bar
      title="房屋管理"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="container">
      <img src="http://liufusong.top:8080/img/not-found.png" alt="" />
      <p>您还没有房源<a href="#">去发布房源</a>吧~</p>
    </div>
  </div>
</template>

<script>
export default {
  created () { },
  data () {
    return {}
  },
  methods: {
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.container {
  text-align: center;
  margin-top: 60px;
  img {
    width: 310px;
    height: 190px;
  }
  p {
    font-size: 28px;
  }
}
</style>
