<template>
  <div>
    <div class="home">
      <div class="search">
        <van-search
          v-model="value"
          show-action
          placeholder="请输入小区或地址"
          @search="onSearch"
        >
          <template #left
            ><div class="location">
              <span @click="$router.push('/city')"
                >{{ $store.state.nowCity }}<i><van-icon name="arrow-down" /></i
              ></span></div
          ></template>
          <template #action>
            <div @click="onSearch">
              <i class="icon"><van-icon name="location-o" /></i>
            </div>
          </template>
        </van-search>
      </div>
      <div class="swipers">
        <van-swipe class="my-swipe" :autoplay="2000" indicator-color="white">
          <van-swipe-item v-for="item in Imglist" :key="item.id"
            ><img :src="'http://liufusong.top:8080' + item.imgSrc" alt=""
          /></van-swipe-item>
        </van-swipe>
      </div>
      <div class="flexbox">
        <van-grid clickable :column-num="4">
          <van-grid-item icon="wap-home-o" text="整租" to="/search" />
          <van-grid-item icon="friends-o" text="合租" url="/search" />
          <van-grid-item icon="location-o" text="地图找房" to="/map" />
          <van-grid-item icon="home-o" text="去出租" to="/add" />
        </van-grid>
      </div>
      <div class="group">
        <div class="group-title">
          <h3>租房小组</h3>
          <span>更多</span>
        </div>
        <div class="group-tu">
          <van-grid
            direction="horizontal"
            :column-num="2"
            gutter="10px"
            icon-size="26"
          >
            <div class="tupian" v-for="item in groupsList" :key="item.id">
              <img :src="'http://115.159.87.220:8080' + item.imgSrc" />
              图片
              <div>
                <p>{{ item.title }}</p>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </van-grid>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getImg, getGroups } from '@/api/home'
export default {
  async created () {
    const res = await getImg()
    // console.log(res)
    this.Imglist = res.data.body
    const res1 = await getGroups()
    // console.log(res1)
    this.groupsList = res1.data.body
  },
  data () {
    return {
      value: '',
      Imglist: [],
      groupsList: []
    }
  },
  methods: {
    onSearch () {
      this.$router.push({ path: '/map' })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.home {
  // background-color: #f6f5f6;
  /deep/ .search {
    top: 10px;
    margin-left: 20px;
    position: fixed;
    z-index: 999;
    // width: 95%;
    width: 710px;
    border-radius: 3px;
    .location {
      font-size: 30px;
      margin-right: 20px;
    }
    .icon {
      font-size: 40px;
    }
    .van-search {
      background-color: rgba(0, 0, 0, 0);
    }
  }
  .swipers {
    .my-swipe .van-swipe-item {
      color: #fff;
      font-size: 20px;
      text-align: center;
      img {
        width: 100%;
      }
    }
  }
  .flexbox {
    padding-top: 30px;
    .van-grid-item {
      color: #03af68;
    }
  }
  .group {
    .group-title {
      display: flex;
      justify-content: space-between;
      align-items: baseline;
      padding: 0 30px;
    }
    background-color: #f6f5f6;
    width: 100%;
    height: 370px;
    h3 {
      font-size: 30px;
    }
    span {
      font-weight: normal;
      font-size: 30px;
    }
    .tupian {
      display: flex;
      font-size: 18px;
      width: 342px;
      height: 110px;
      background-color: #fff;
      margin-top: 10px;
      margin-left: 10px;
      border-radius: 10px;
      p {
        margin-left: 50px;
      }
      img {
        width: 40px;
        height: 40px;
        margin-left: 10px;
      }
    }
  }
}
</style>
