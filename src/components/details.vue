<template>
  <div>
    <van-nav-bar
      :title="houseList.community"
      left-arrow
      @click-left="$router.go(-1)"
    ></van-nav-bar>
    <div class="imgs">
      <img :src="`http://liufusong.top:8080` + houseList.houseImg" alt="" />
    </div>
    <div class="icon-ditie">
      <span>{{ tagsList }}</span>
    </div>
    <div class="describe">
      <div>
        <span>{{ houseList.price }}<i>/月</i></span>
        <p>租金</p>
      </div>
      <div>
        <span>{{ houseList.roomType }}</span>
        <p>房型</p>
      </div>
      <div>
        <span>{{ houseList.size }}平米</span>
        <p>面积</p>
      </div>
    </div>
    <div class="border"></div>
    <van-row class="textList" type="flex" justify="space-around">
      <van-col span="15">装修:<span> 精装</span></van-col>
      <van-col span="9"
        >朝向:<span> {{ orientedList }}</span></van-col
      >
      <van-col span="15"
        >楼层:<span> {{ houseList.floor }}</span></van-col
      >
      <van-col span="9">类型:<span> 普通住宅</span></van-col>
    </van-row>
    <p class="yinying"></p>
    <div class="map">
      <p>小区：<span>天山星城</span></p>
      <div id="adress"></div>
    </div>
    <div class="setion">
      <p>房屋配套</p>
      <div class="tags">
        <div
          v-for="(item, index) in houseList.supporting"
          :key="index"
          class="textAll"
        >
          <van-grid :border="false">
            <van-grid-item icon="point-gift-o" />
            <div class="text">{{ item }}</div>
          </van-grid>
        </div>
      </div>
    </div>
    <div class="information">
      <p>房源概况</p>
      <div class="avatar">
        <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
        <div class="text">
          <p>杨先生</p>
          <p>已认证房主</p>
        </div>
        <div class="btn">发消息</div>
      </div>
      <p class="font">
        1.周边配套齐全，地铁四号线陶然亭站，交通便利，公交云集，距离北京南站、西站都很近距离。
        2.小区规模大，配套全年，幼儿园，体育场，游泳馆，养老院，小学。
        3.人车分流，环境优美。
        4.精装两居室，居家生活方便，还有一个小书房，看房随时联系。
      </p>
    </div>
    <div class="footer">
      <p>猜你喜欢</p>
      <div class="tags">
        <!-- <detai></detai> -->
      </div>
    </div>
    <div class="button">
      <div class="left" @click="like">
        <van-icon v-if="flag" name="like" /><van-icon
          v-else
          name="star-o"
        />收藏
      </div>
      <div class="middle">在线咨询</div>
      <div class="right">电话预约</div>
    </div>
  </div>
</template>

<script>
import { getUserHomes, addFavorites, delFavorites } from '@/api/my'
import AMapLoader from '@amap/amap-jsapi-loader'
export default {
  async created () {
    try {
      const res = await getUserHomes(this.$route.params.code)
      console.log(res)
      this.houseList = res.data.body
      this.orientedList = res.data.body.oriented[0]
      this.tagsList = res.data.body.tags[0]
      this.initMap()
    } catch (err) {
      console.log(err)
    }
    // console.log(this.$route.params.code)
  },
  data () {
    return {
      houseList: [],
      orientedList: '',
      tagsList: '',
      tuijianList: [],
      map: null,
      flag: false
    }
  },
  mounted () {
  },
  methods: {
    async like () {
      if (this.flag === true) {
        try {
          this.flag = false
          const res = await delFavorites(this.$route.params.code)
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      } else {
        try {
          this.flag = true
          const res = await addFavorites(this.$route.params.code)
          console.log(res)
        } catch (err) {
          console.log(err)
        }
      }
    },
    initMap () {
      AMapLoader.load({
        key: 'bc95edbbb7f3fa40bb524b6edc5d2e9b', // 申请好的Web端开发者Key，首次调用 load 时必填
        version: '2.0', // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
        plugins: [''] // 需要使用的的插件列表，如比例尺'AMap.Scale'等
      }).then((AMap) => {
        const map = new AMap.Map('adress', {
          viewMode: '3D',
          zoom: 16,
          center: [this.houseList.coord.longitude, this.houseList.coord.latitude],
          resizeEnable: true
        })

        // 创建纯文本标记
        const text = new AMap.Text({
          text: this.houseList.community,
          anchor: 'center', // 设置文本标记锚点
          draggable: true,
          cursor: 'pointer',
          angle: 10,
          style: {
            padding: 0,
            'margin-bottom': '1rem',
            'border-radius': '.25rem',
            'background-color': 'white',
            'border-width': 0,
            'box-shadow': '0 2px 6px 0 rgba(114, 124, 245, .5)',
            'text-align': 'center',
            'font-size': '20px',
            color: 'blue'
          },
          position: [this.houseList.coord.longitude, this.houseList.coord.latitude]
        })

        text.setMap(map)
      }).catch(e => {
        console.log(e)
      })
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.imgs {
  // background-color: pink;
  text-align: center;
  position: relative;
  img {
    height: 700px;
  }
}
.describe {
  display: flex;
  justify-content: space-around;
  span {
    color: #fa5741;
    font-size: 34px;
    font-weight: bolder;
  }
  p {
    height: 26px;
    line-height: 26px;
    font-size: 26px;
    color: #999;
    text-align: center;
  }
}
.border {
  border-bottom: 1px solid #d1d1d1;
  margin-top: 30px;
  margin-bottom: 40px;
}
.textList {
  margin-left: 40px;
  display: inline-block;
  color: #999;
  padding-right: 5px;
  line-height: 26px;
  font-size: 28px;
  margin-right: 100px;
  /deep/span {
    color: black;
  }
  /deep/ .van-col {
    height: 50px;
  }
}
.yinying {
  height: 20px;
  background-color: #f6f5f6;
}
.map {
  p {
    margin: 0 3%;
    margin: 20px 0;
    line-height: 44px;
    font-size: 28px;
    font-weight: 400;
  }
  #adress {
    width: 100vw;
    height: 290px;
  }
}
.setion {
  p {
    font-weight: 600;
    font-size: 30px;
  }
  .tags {
    .textAll {
      display: flex;
      justify-content: space-around;
    }
    display: flex;
    width: 100px;
    margin-bottom: 20px;
    border-top: 1px solid rgb(223, 221, 221);
    border-bottom: 1px solid rgb(223, 221, 221);
    .text {
      display: flex;
      font-size: 18px;
    }
  }
}
.information {
  p {
    font-weight: 600;
    font-size: 30px;
  }
  .avatar {
    display: flex;
    align-items: center;
    img {
      width: 104px;
      height: 104px;
    }
    .text {
      margin-left: 40px;
      p {
        font-size: 26px;
        color: #333;
        font-weight: 400;
        line-height: 40px;
      }
    }
    .btn {
      position: absolute;
      right: 50px;
      color: #33be85;
      border: 1px solid #33be85;
      border-radius: 6px;
      padding: 6px 30px;
      font-size: 28px;
    }
  }
  .font {
    margin: 20px 10px;
    font-weight: 400;
    font-size: 28px;
    line-height: 40px;
    color: #333;
  }
}
.button {
  display: flex;
  height: 100px;
  border-top: 1px solid rgb(215, 214, 214);
  .left {
    .van-icon {
      margin-right: 10px;
    }
    text-align: center;
    flex: 1;
    font-size: 34px;
    color: #999;
    line-height: 100px;
    border-right: 1px solid rgb(215, 214, 214);
  }
  .middle {
    text-align: center;
    line-height: 100px;
    font-size: 34px;
    color: #999;
    flex: 1;
  }
  .right {
    text-align: center;
    flex: 1;
    font-size: 34px;
    color: #fff;
    line-height: 100px;
    background-color: #21a97b;
  }
}
.footer {
  p {
    font-weight: 600;
    font-size: 30px;
  }
  .tags {
    margin-top: 20px;
    margin-bottom: 20px;
    border-top: 1px solid rgb(223, 221, 221);
    border-bottom: 1px solid rgb(223, 221, 221);
  }
}
.icon-ditie {
  span {
    position: absolute;
    bottom: 43%;
    left: 4%;
    display: inline-block;
    font-size: 24px;
    border-radius: 5px;
    padding: 8px 10px;
    margin-right: 10px;
    line-height: 24px;
    background-color: #e1f5f8;
    color: #39c3d9;
  }
}
</style>
