<template>
  <div>
     <el-button type="success">成功按钮</el-button>
     <el-input-number v-model="num" @change="handleChange" :min="1" :max="10" label="描述文字"></el-input-number>
  </div>
</template>

<script>
export default {
    data() {
      return {
        num: 1
      };
    },
    methods: {
      handleChange(value) {
        console.log(value);
      }
    },
    mounted(){

    // 请求测试接口
    console.log(this);
    this.$axios({
      url: "https://api.github.com/users",
      method: "GET",
      // get请求参数
      params: {
        abc: 123
      }
    }).then(res => {
      console.log(res)
    })
  }
}
</script>

<style>

</style>
