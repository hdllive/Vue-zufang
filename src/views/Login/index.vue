<template>
  <div>
    <van-nav-bar title="账号登录" left-arrow @click-left="$router.go(-1)" />

    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        placeholder="请输入账号"
        :rules="[{ required: true, message: '请填写账号' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block native-type="submit" class="login-btn"
          ><span>登 录</span></van-button
        >
      </div>
      <p class="footer" @click="jumpFn">还没有账号，去注册~</p>
    </van-form>
  </div>
</template>

<script>
import { login } from '@/api/login'
export default {
  created () { },
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit (values) {
      try {
        const res = await login(values)
        console.log(res)
        if (res.data.status === 200) {
          this.$toast.success('登录成功')
          this.$store.commit('setToken', res.data.body)
          this.$router.push('/my')
        } else {
          this.$toast.success('登录失败')
        }
      } catch (err) {
        console.log(err)
      }
    },
    jumpFn () {
      this.$router.push('/registe')
    }
  },
  computed: {},
  watch: {},
  filters: {},
  components: {}
}
</script>

<style scoped lang="less">
.login-btn {
  width: 694px;
  height: 105px;
  background-color: #1cb676;
  border-radius: 5px;
  span {
    width: 102px;
    height: 40px;
    font-size: 38px;
    line-height: 36px;
    color: #ffffff;
  }
}
/deep/ .footer {
  text-align: center;
  color: #666;
  font-size: 28px !important;
}
.van-cell,
.van-field {
  height: 120px;
  line-height: 120px;
}
</style>
