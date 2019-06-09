<template>
  <div class="view">
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="用户名" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model="ruleForm.password" type="password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      ruleForm: {
        name: "",
        password:""
      },
      rules: {
        name: [
          { required: true, message: "用户名", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      const data = {
        uname:this.ruleForm.name,
        upwd:this.ruleForm.password
      }
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$axios({
        method: "POST",
        url: "http://127.0.0.1:8899/admin/account/login",
        data,
        withCredentials: true      
      }).then(res => {
        const{status,message} = res.data
        if(status === 0){
          this.$router.push("/")
        }
        if(status === 1){
          this.$message.error(message);
        }
      })
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    }
  }
};
</script>

<style scoped>
  .view {
    background: #ccc;
    width: 100%;
    position:absolute;
    top: 0;
    bottom: 0;
  }
  .view .demo-ruleForm {
    position: absolute;
    width: 500px;
    top: 50%;
    left: 50%;
    margin-left: -250px;
    margin-top: -93px;
  }
</style>