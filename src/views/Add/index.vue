<template>
  <div class="main">
    <van-nav-bar
      class="bar"
      title="发布房源"
      left-arrow
      @click-left="backFn"
    ></van-nav-bar>
    <van-cell-group>
      <van-cell title="房源信息" />
    </van-cell-group>
    <van-cell title="小区名称" is-link @click="$router.push('/rentSearch')">
      <template #default> {{ $store.state.searchValue }} </template>
    </van-cell>

    <van-field
      v-model="number"
      placeholder="请输入租金/月"
      type="number"
      label="租金"
    />
    <van-field
      v-model="number1"
      placeholder="请输入建筑面积"
      label="建筑面积"
    />

    <!-- 户型选择 -->
    <van-field
      readonly
      clickable
      name="picker"
      :value="value"
      label="户型"
      placeholder="请选择"
      @click="show = true"
      input-align="right"
    ></van-field>
    <van-overlay :show="show" @click="show = false">
      <div class="wrapper" @click.stop>
        <van-picker
          show-toolbar
          :columns="columns"
          @confirm="onConfirm"
          @cancel="show = false"
        />
      </div>
    </van-overlay>

    <!-- 所在楼层 -->
    <van-field
      readonly
      clickable
      name="picker"
      :value="value1"
      label="所在楼层"
      placeholder="请选择"
      @click="show1 = true"
      input-align="right"
    />
    <van-overlay :show="show1" @click="show1 = false">
      <div class="wrapper" @click.stop>
        <van-picker
          show-toolbar
          :columns="columns1"
          @confirm="onConfirm1"
          @cancel="show1 = false"
        />
      </div>
    </van-overlay>

    <!-- 朝向 -->

    <!-- 所在楼层 -->
    <van-field
      readonly
      clickable
      name="picker"
      :value="value2"
      label="朝向"
      placeholder="请选择"
      @click="show2 = true"
      input-align="right"
    />
    <van-overlay :show="show2" @click="show2 = false">
      <div class="wrapper" @click.stop>
        <van-picker
          show-toolbar
          :columns="columns2"
          @confirm="onConfirm2"
          @cancel="show2 = false"
        />
      </div>
    </van-overlay>

    <van-cell-group>
      <van-cell title="房源标题" />
    </van-cell-group>
    <van-field
      v-model="message"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入标题（例如：整租 小区名 2室 5000元）"
    >
    </van-field>
    <div class="am-list-header">
      <p>房屋图像</p>
      <van-uploader :after-read="afterRead" upload-icon="plus" />
    </div>
    <div class="am-list-header">
      <p>房屋配置</p>
      <van-grid :column-num="5" icon-size="24px">
        <van-grid-item
          icon="send-gift-o"
          text="衣柜"
          style="color: red"
          @click="activeFn"
        />
        <van-grid-item icon="debit-pay" text="洗衣机" />
        <van-grid-item icon="credit-pay" text="空调" />
        <van-grid-item icon="fire-o" text="天然气" />
        <van-grid-item icon="shop-o" text="冰箱" />
        <van-grid-item icon="cluster-o" text="暖气" />
        <van-grid-item icon="tv-o" text="电视" />
        <van-grid-item icon="bulb-o" text="热水器" />
        <van-grid-item icon="points" text="宽带" />
        <van-grid-item icon="discount" text="沙发" />
      </van-grid>
    </div>
    <div class="yinying"></div>
    <div class="am-list-header">
      <p>房屋描述</p>
    </div>
    <van-field
      class="footer"
      v-model="message1"
      rows="1"
      autosize
      type="textarea"
      placeholder="请输入房屋描述信息"
    />
    <div class="yinying"></div>
  </div>
</template>

<script>
import { getHouses } from '@/api/search'
export default {
  name: 'Add',
  created () {
    this.getHouses()
  },
  data () {
    return {
      number: '',
      number1: '',
      message: '',
      message1: '',
      value: '',
      columns: [],
      value1: '',
      columns1: [],
      value2: '',
      columns2: [],
      show: false,
      show1: false,
      show2: false,
      houesList: []
    }
  },
  methods: {
    backFn () {
      this.$router.go(-1)
    },
    afterRead (file) {
      // 此时可以自行将文件上传至服务器
      console.log(file)
    },
    onConfirm (value) {
      this.value = value
      //  this.tovalue(value)
      //  this.v1 =  this.houesList.roomType.find(item=>item.label===value)
      this.show = false
    },
    onConfirm1 (value1) {
      this.value1 = value1
      this.show1 = false
    },
    onConfirm2 (value2) {
      this.value2 = value2
      this.show2 = false
    },
    async getHouses () {
      try {
        const res = await getHouses()
        console.log(res)
        this.houesList = res.data.body
        res.data.body.roomType.forEach(item => this.columns.push(item.label))
        res.data.body.floor.forEach(item => this.columns1.push(item.label))
        res.data.body.oriented.forEach(item => this.columns2.push(item.label))
      } catch (err) {
        console.log(err)
      }
    },
    activeFn () { }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang='less'>
.am-list-header {
  color: #333;
  font-size: 28px;
  margin-left: 35px;
  padding-bottom: 25px;
  p {
    border-bottom: 1px solid #efefef;
    height: 55px;
  }
  .van-uploader {
    margin-top: 20px;
  }
}
.yinying {
  height: 50px;
  background-color: #f6f5f6;
}
.footer {
  height: 300px;
}
.content {
  padding: 16px 16px 160px;
}
.wrapper {
  position: fixed;
  bottom: 0;
  width: 100%;
}
</style>
