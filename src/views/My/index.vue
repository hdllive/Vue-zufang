<template>
  <div>
    <div class="my_title login" v-if="$store.state.token.token">
      <img src="http://liufusong.top:8080/img/avatar.png" alt="" />
      <div class="my_info">
        <div class="icon">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
          <div class="my_user">
            <div class="my_name">好客_小胡</div>
            <div class="my_auth"><span @click="outFn">退出</span></div>
            <div class="my_edit">
              <span
                >编辑个人资料<i><van-icon name="play" /></i
              ></span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my_title notlogin" v-else>
      <img src="http://liufusong.top:8080/img/profile/bg.png" alt="" />
      <div class="my_info">
        <div class="icon">
          <img src="http://liufusong.top:8080/img/profile/avatar.png" alt="" />
          <div class="my_user">
            <div class="my_name">游客</div>
            <div class="my_auth">
              <span @click="$router.push({ path: '/login' })">去登录</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="my_card">
      <van-grid clickable :column-num="3">
        <van-grid-item icon="star-o" text="我的收藏" to="/mycollection" />
        <van-grid-item icon="home-o" text="我的出租" to="/sent" />
        <van-grid-item icon="clock-o" text="看房纪录" />
      </van-grid>
      <van-grid clickable :column-num="3">
        <van-grid-item icon="coupon-o" text="成为房主" />
        <van-grid-item icon="manager-o" text="个人资料" />
        <van-grid-item icon="service-o" text="联系我们" />
      </van-grid>
    </div>
    <div class="my_ad">
      <img src="http://liufusong.top:8080/img/profile/join.png" alt="" />
    </div>
  </div>
</template>

<script>
import { Dialog } from 'vant'
import { logout } from '@/api/login'
import { mapState } from 'vuex'

export default {
  created () { },
  data () {
    return {}
  },
  methods: {
    outFn () {
      Dialog.confirm({
        title: '提示',
        message: '是否确定退出'
      })
        .then(() => {
          if (this.$store.state.token.token) {
            // logout().then((res) => console.log(res))
            logout()
            this.$toast.success('退出成功')
            this.$store.commit('token', {})
            this.$router.push('/login')
          } else {
            this.$toast.success('退出失败')
          }
        })
        .catch(() => {
          // on cancel
        })
    }
  },
  computed: {
    ...mapState(['token'])
  },
  watch: {},
  filters: {},
  components: {
    [Dialog.Component.name]: Dialog.Component
  }
}
</script>

<style scoped lang='less'>
.my_title {
  min-height: 250px;
  position: relative;
  box-sizing: border-box;
  img {
    width: 100%;
  }
  .my_info {
    width: 640px;
    height: 405px;
    background-color: #fff;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    text-align: center;
    box-shadow: 0 0 10px 3px #ddd;
    .icon {
      position: relative;
      transform: translateY(-50%);
      display: inline-block !important;
      border-radius: 50%;
      width: 150px;
      height: 150px;
      border: 5px solid #f5f5f5;
    }
    .my_user {
      padding-top: 50px;
      .my_name {
        margin-top: -30px;
        margin-bottom: 15px;
        font-size: 18px;
      }
      .my_auth {
        border-radius: 20px;
        color: #fff;
        padding: 2px 6px;
        background: #21b97a;
        font-size: 12px;
        margin-bottom: 60px;
      }
      .my_edit {
        color: #999;
        font-size: 12px;
        margin-top: 20px;
        width: 168px;
      }
    }
  }
}
.my_ad {
  width: 705px;
  height: 170px;
  margin-left: 25px;
  img {
    width: 100%;
    height: 100%;
  }
}
.notlogin {
  img {
    width: 100%;
  }
  .my_info {
    position: unset;
    margin-left: 50%;
    height: unset;
  }
}
</style>
