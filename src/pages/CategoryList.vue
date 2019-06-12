<template>
  <div class="custom-tree-container">
    <div class="block">
      <el-tree
        :data="data"
        show-checkbox
        node-key="id"
        default-expand-all
        :expand-on-click-node="false"
      >
        <span class="custom-tree-node" slot-scope="{ node, data }">
          <span>{{ data.title }}</span>
          <span><input :value="data.sort_id"></span>        
          <span>
            <el-button type="text" size="mini" @click="() => handleEdit(data)">编辑</el-button>
          </span>
        </span>
      </el-tree>
    </div>
  </div>
</template>


<script>
let id = 1000;

export default {
  data() {
    const data = [];
    return {
      data: JSON.parse(JSON.stringify(data))
    };
  },

methods:{
    handleEdit(){
        console.log(123);
    }
},
mounted(){
        // 请求分类数据
        this.$axios({
            url: "http://localhost:8899/admin/category/getlist/goods",
            method: 'GET'
        }).then(res => {
            console.log(res);
            const {status, message} = res.data;

            if(status === 0){
                //  把列表的数据赋值给data，渲染到树形控件
                this.data = message;
            }
        })
}
};
</script>

<style>
.custom-tree-node {
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 14px;
  padding-right: 8px;
}
</style>