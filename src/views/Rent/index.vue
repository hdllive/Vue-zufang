<template>
  <div>
    <van-nav-bar
      title="房屋管理"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="container" v-if="LookHousesList.length === 0">
      <img src="http://liufusong.top:8080/img/not-found.png" alt="" />
      <p>您还没有房源<a href="#">去发布房源</a>吧~</p>
    </div>

    <detai
      v-else
      v-for="(item, index) in LookHousesList"
      :key="index"
      :item="item"
    ></detai>
  </div>
</template>

<script>
import { getLookHouses } from '@/api/my'
import detai from '@/components/detai.vue'
export default {
  async created () {
    const res = await getLookHouses()
    console.log(res)
    this.LookHousesList = res.data.body
  },
  data () {
    return {
      LookHousesList: []
    }
  },
  methods: {
  },
  computed: {},
  watch: {},
  filters: {},
  components: { detai }
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
