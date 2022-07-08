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
      <van-uploader
        v-model="fileList"
        :after-read="afterRead"
        upload-icon="plus"
      />
    </div>
    <div class="am-list-header">
      <p>房屋配置</p>
      <van-grid :column-num="5" icon-size="24px">
        <van-grid-item
          icon="send-gift-o"
          :text="item.label"
          :class="{
            active: supportingList1.some((item1) => item.label === item1),
          }"
          @click="changeClass(item.label)"
          v-for="(item, index) in supportingList"
          :key="index"
          clickable
        />
        <!-- <van-grid-item icon="debit-pay" text="洗衣机" />
        <van-grid-item icon="credit-pay" text="空调" />
        <van-grid-item icon="fire-o" text="天然气" />
        <van-grid-item icon="shop-o" text="冰箱" />
        <van-grid-item icon="cluster-o" text="暖气" />
        <van-grid-item icon="tv-o" text="电视" />
        <van-grid-item icon="bulb-o" text="热水器" />
        <van-grid-item icon="points" text="宽带" />
        <van-grid-item icon="discount" text="沙发" /> -->
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
    <div class="btn">
      <button class="left">取消</button>
      <button class="right" @click="homeFn">提交</button>
    </div>
  </div>
</template>

<script>
import { getHouses } from '@/api/search'
import { getHomeImage, createHomes } from '@/api/home'
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
      beforcolumnsVal: [], // 存放户型当前选择的value值
      beforcolumns1Val: [], // 存放所在楼层当前选择的value值
      beforcolumns2Val: [], // 存放朝向当前选择的value值
      show: false,
      show1: false,
      show2: false,
      houesList: [], // 存放放回所有的数据
      supportingList: [], // 存放电视，冰箱...的所有总数据
      supportingList1: [], // 存放已点击选择高亮的数据的value
      supportingList1Val: '', // 存放已点击选择高亮的数据的value的join|
      fileList: [], // 图片存储数据的数组,base 64,渲染用的
      fileListSrc: '',
      data: {} // 发送请求的大对象

    }
  },
  methods: {
    backFn () {
      this.$router.go(-1)
    },
    async afterRead (file) {
      // 此时可以自行将文件上传至服务器
      try {
        const formData = new FormData()
        formData.append('file', file.file)
        const res = await getHomeImage(formData)
        console.log(res)
        this.fileList.push(res.data.body)
        this.fileList.pop()
        this.fileListSrc = res.data.body[0]
        // console.log(this.fileListSrc)
        // this.imgs.push(res.data.body)
      } catch (err) {
        console.error(err)
      }
      console.log(file)
    },
    onConfirm (value) {
      // console.log(value)
      this.value = value
      this.show = false
      this.houesList.roomType.forEach(item => {
        if (item.label === value) {
          this.beforcolumns1Val = item.value
        }
      })
      console.log(this.beforcolumns1Val)
    },
    onConfirm1 (value1) {
      this.value1 = value1
      this.show1 = false
      this.houesList.floor.forEach(item => {
        if (item.label === value1) {
          this.beforcolumns2Val = item.value
        }
      })
      console.log(this.beforcolumns2Val)
    },
    onConfirm2 (value2) {
      this.value2 = value2
      this.show2 = false
      this.houesList.oriented.forEach(item => {
        if (item.label === value2) {
          this.beforcolumnsVal = item.value
        }
      })
      console.log(this.beforcolumnsVal)
    },
    async getHouses () {
      try {
        const res = await getHouses()
        console.log(res)
        this.houesList = res.data.body
        // 存储进来所有的label数据文字
        res.data.body.roomType.forEach(item => this.columns.push(item.label))
        res.data.body.floor.forEach(item => this.columns1.push(item.label))
        res.data.body.oriented.forEach(item => this.columns2.push(item.label))
        this.supportingList = res.data.body.supporting
        console.log(this.supportingList)
        // 存储进来所有的数组value值
        res.data.body.roomType.forEach(item => this.beforcolumnsVal.push(item))
        res.data.body.floor.forEach(item => this.beforcolumns1Val.push(item))
        res.data.body.oriented.forEach(item => this.beforcolumns2Val.push(item))
      } catch (err) {
        console.log(err)
      }
    },
    changeClass (label) {
      const index = this.supportingList1.indexOf(label)
      if (index === -1) {
        this.supportingList1.push(label)
      } else {
        this.supportingList1.splice(index, 1)
      }
      console.log(this.supportingList1)
      this.supportingList1Val = ''
      this.supportingList1.forEach((item, index) => {
        if (index === this.supportingList1.length - 1) {
          this.supportingList1Val = this.supportingList1Val + item
        } else {
          this.supportingList1Val = this.supportingList1Val + item + '|'
        }
      })
      console.log(this.supportingList1Val)
    },
    async homeFn () {
      this.data = {
        title: this.message, // 整租合租类型
        description: this.message1, // 房屋描述
        houseImg: this.fileListSrc, // 上传的图片
        oriented: this.beforcolumnsVal, // 朝向，东南西北
        supporting: this.supportingList1Val, // 选择图标的空调|洗衣机
        price: this.number, // 房屋的价格
        roomType: this.beforcolumns1Val, // 房屋的户型
        size: this.number1, // 房屋的建筑面积
        floor: this.beforcolumns2Val, // 房屋的所在楼层
        community: this.$store.state.setSearchValueCity // 地址id
      }
      try {
        const res = await createHomes(this.data)
        console.log(res)
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
.active {
  color: red;
}
/deep/.btn {
  position: fixed;
  bottom: 0;
  display: flex;
  line-height: 90px;
  width: 100%;
  text-align: center;
  height: 90px;
  z-index: 1;
  font-size: 30px;
  background-color: #fff;
  .left {
    box-sizing: border-box;
    flex: 1 1;
    color: #21b97a;
    border: none;
    background-color: #fff;
  }
  .right {
    background-color: #21b97a;
    box-sizing: border-box;
    flex: 1 1;
    color: #fff;
    border: none;
  }
}
</style>
