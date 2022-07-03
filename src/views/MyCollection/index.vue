<template>
  <div>
    <van-nav-bar title="收藏列表" left-arrow @click-left="backFn" />
    <div class="homeItem" v-for="item in favorites" :key="item.id">
      <div class="left">
        <img :src="'http://liufusong.top:8080' + item.houseImg" alt="" />
      </div>
      <div class="right">
        <h3>{{ item.title }}</h3>
        <p>{{ item.desc }}</p>
        <div class="bottom">
          <span
            class="tubiao"
            v-for="(item1, index) in item.tags.slice(0, 3)"
            :key="index"
            ><i>{{ item1 }}</i></span
          >
          <div class="price">
            <span>{{ item.price }}</span> <i>元/月</i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getfavorites } from '@/api/my'
export default {
  created () {
    this.getfavorites()
  },
  data () {
    return {
      favorites: []
    }
  },
  methods: {
    backFn () {
      this.$router.go(-1)
    },
    async getfavorites () {
      try {
        const res = await getfavorites()
        console.log(res)
        this.favorites = res.data.body
      } catch (err) {
        console.log(err)
      }
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.homeItem {
  display: flex;
  margin-top: 35px;
  border-bottom: 1px solid #ebebeb;
  width: 750px;
  height: 160px;
  overflow: hidden;
  .left {
    flex: 1;
    img {
      width: 212px;
      height: 160px;
    }
  }
  .right {
    position: relative;
    flex: 1;
    margin-left: 30px;
    h3 {
      width: 7.2rem;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-size: 26px;
      color: #394043;
    }
    p {
      font-size: 18px;
      color: #afb2b3;
    }
    .bottom {
      position: absolute;
      top: 28%;
      /deep/.tubiao {
        width: 250px;
        height: 20px;
        overflow: hidden;
        i {
          color: #39becd;
          background: #e1f5f8;
          display: inline-block;
          font-size: 12px;
          border-radius: 3px;
          padding: 8px 10px;
          margin-right: 5px;
          line-height: 12px;
        }
      }
      .price {
        font-size: 30px;
        font-weight: bolder;
        color: #fa5741;
        i {
          font-size: 12px;
        }
      }
    }
  }
}
</style>
