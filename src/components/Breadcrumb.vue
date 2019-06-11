<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">
    <el-breadcrumb-item v-for="(item,index) in info" :key="index">{{item}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data() {
    return {
      info: [],
      // path: []
    };
  },
  watch: {
    $route() {
      this.getMeta();
      // this.getPath();
    }
  },
  methods: {
    getMeta() {
      const info = this.$route.matched.map(v => {
        return v.meta;
      });
      this.info = info;
    },
    // getPath() {
    //   const path = this.$route.matched.map(v => {
    //     return v.path;
    //   });
    //   this.path = path;
    // }
  },
  mounted() {
    this.getMeta();
    // this.getPath();
  }
};
</script>

<style>
  .el-breadcrumb {
    margin-bottom: 20px;
  }
</style>
