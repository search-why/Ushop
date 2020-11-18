<template>
  <div class="login">
    <div class="box">
      <h3>登录</h3>
      <div class="line">
        <el-input v-model="user.username" placeholder="请输入账号"></el-input>
      </div>
      <div class="line">
        <el-input v-model="user.password" placeholder="请输入密码" show-password></el-input>
      </div>
      <div class="last">
        <el-button type="primary" @click="login">登录</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { reqLogin } from "../../utils/http";
import { successAlert } from "../../utils/alert";
export default {
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions({
      "changeUser": "changeUser"
    }),
    login() {
      reqLogin(this.user).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg)
          console.log(res.data);
          this.changeUser(res.data.list)
          this.$router.push("/");
        }
      });
    },
  },
  computed: {
    ...mapGetters({}),
  },
  mounted() {},
};
</script>

<style>
.login {
  width: 100vw;
  height: 100vh;
  position: relative;
  background: linear-gradient(to right, #543444, #403A53, #303D5F);
}
.box {
  width: 400px;
  padding: 20px;
  background: #fff;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
}
h3 {
  text-align: center;
  margin: 10px;
}
.line {
  margin-bottom: 15px;
}
.last {
  text-align: center;
}
</style>