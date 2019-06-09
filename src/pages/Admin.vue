<template>
  <div class="view">
    <el-container>
      <el-aside width="auto">
        <AsideNav :isShow="isShow"></AsideNav>
      </el-aside>
      <el-container>
        <el-header><Header @click="handleToggle"></Header></el-header>
        <el-main><Breadcrumb></Breadcrumb></el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import AsideNav from "../components/AsideNav.vue";
import Header from "../components/Header.vue";
import Breadcrumb from "../components/Breadcrumb.vue";
export default {
    data(){
        return {
            isShow: false
        }
    },
    methods:{
        handleToggle(){
            this.isShow = !this.isShow;
        }
    },
  components: { 
      AsideNav,
      Header,
      Breadcrumb
       }
};
</script>

<style>
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  line-height: 200px;
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
  line-height: 160px;
}

.view > .el-container {
  width: 100%;
  position: absolute;
  top: 0;
  bottom: 0;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>

