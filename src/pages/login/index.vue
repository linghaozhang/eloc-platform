<template>
  <div class="eloc-login">
    <div class="eloc-login-topbar">
      <img src="../../assets/eloc-logo.png" alt="">
      <span>智能交通管控平台</span>
    </div>
    <div class="eloc-login-main">
      <img src="../../assets/mainimglefta.png" alt="">
      <div class="eloc-login-main-form">
        <div class="eloc-login-main-form-welcome">欢迎登录</div>
        <a-form :form="form" @submit="handleSubmit">
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-input
                    size="large"
                    style="width: 100%"
                    placeholder="请输入用户名"
                    v-decorator="['uname', { rules: [{ required: true, message: '请输入用户名' }] }]"
            >
              <a-icon slot="prefix" type="user" />
            </a-input>
          </a-form-item>
          <a-form-item :wrapper-col="{ span: 24 }">
            <a-input
                    size="large"
                    style="width: 100%"
                    placeholder="请输入密码"
                    type="password"
                    v-decorator="['password', { rules: [{ required: true, message: '请输入用户名' }] }]"
            >
              <a-icon slot="prefix" type="unlock" />
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button type="primary" html-type="submit" block size="large">
              登陆
            </a-button>
          </a-form-item>
        </a-form>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        formLayout: 'horizontal',
        form: this.$form.createForm(this, {name: 'coordinated'}),
        show: true
      };
    },
    methods: {
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            console.log('Received values of form: ', values);
          }
        });
      },
      handleSelectChange(value) {
        console.log(value);
        this.form.setFieldsValue({
          note: `Hi, ${value === 'male' ? 'man' : 'lady'}!`,
        });
      },
    },
  }
</script>
<style lang="less">
  @import './index.less';
</style>