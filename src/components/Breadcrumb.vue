<template>
  <el-breadcrumb separator-class="el-icon-arrow-right">   
    <el-breadcrumb-item v-for="(item,index) in info" :key="index" :to="'/admin'">
      {{item}}
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
  data(){
    return {
      info:[],
      // path:null
    }
  },
  watch:{
    $route(){
      this.getMeta();
      // this.path = this.$route.path;
      // console.log(this.$route);
    }
  },
  methods:{
    getMeta(){
      const info = this.$route.matched.map(v=>{
        return v.meta
      })
      this.info = info;
    }
  },
  mounted(){
    this.getMeta();
  }
};
</script>

<style>
</style>
