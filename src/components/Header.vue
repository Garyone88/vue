<template>
  <div>
    <!-- el-row是布局组件
    type=flex声明是flex布局，并且带有降级方案（如果浏览器不支持flex，会自动调用其他布局方式）-->
    <el-row type="flex" justify="space-between">
      <div class="arrow" @click="handleClick">
        <i class="el-icon-back" ref="arrow"></i>
      </div>
      <div>admin 超级管理员 退出</div>
    </el-row>
  </div>
</template>

<script>
export default {
    methods:{
        handleClick(){
            this.$emit("click");
            // 改变箭头样式；
            if(this.$refs.arrow.className === "el-icon-back"){
              this.$refs.arrow.classList.add("el-icon-right");
              this.$refs.arrow.classList.remove("el-icon-back");
            }else{
              this.$refs.arrow.classList.add("el-icon-back");
              this.$refs.arrow.classList.remove("el-icon-right");
            }
        }
    }
};
</script>

<style scoped>
    .arrow {
        cursor: pointer;
    }
</style>
