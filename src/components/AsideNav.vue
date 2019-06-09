<template>

      <el-menu
        default-active="1-1"
        class="el-menu-vertical-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        :collapse="isShow"
      >
        <el-submenu index="1">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>购物商城</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="1-1">商品管理</el-menu-item>
            <el-menu-item index="1-2">栏目管理</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="2">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>会员管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="2-1">普通会员</el-menu-item>
            <el-menu-item index="2-2">高级会员</el-menu-item>
          </el-menu-item-group>
        </el-submenu>

        <el-submenu index="3">
          <template slot="title">
            <i class="el-icon-menu"></i>
            <span>商城订单</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="3-1">未完成订单</el-menu-item>
            <el-menu-item index="3-2">已完成订单</el-menu-item>
          </el-menu-item-group>
        </el-submenu>


      </el-menu>

</template>


<script>
export default {
    props:["isShow"],
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    }
  }
};
</script>

<style scoped>
    .el-menu-vertical-demo {
        height: 100%;
    }
</style>
