<template>
  <div class="goodslist">
    <el-row type="flex" justify="space-between" class="tools">
      <div>
        <el-button type="primary">新增</el-button>
        <el-button type="danger" @click="handleDels">删除</el-button>
      </div>
      <div>
        <el-input placeholder="请输入内容" v-model="input" class="input-with-select">
          <el-button slot="append" icon="el-icon-search" @click="handleSearch"></el-button>
        </el-input>
      </div>
    </el-row>
    <el-table
      ref="multipleTable"
      :data="tableData"
      tooltip-effect="dark"
      style="width: 100%"
      @selection-change="handleSelectionChange"
    >
      <el-table-column type="selection" width="55"></el-table-column>
      <el-table-column label="标题" width="300">
        <template slot-scope="scope">
          <el-row type="flex" align="middle">
            <!-- <img :src="scope.row.imgurl" /> -->
            <div>{{scope.row.title}}</div>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column prop="categoryname" label="类型" width="120"></el-table-column>
      <el-table-column prop="sell_price" label="价格" show-overflow-tooltip></el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button size="mini" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="pageIndex"
        :page-sizes="[5, 10, 20]"
        :page-size="pageSize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tableData: [],
      input: "",
      total: 10,
      pageSize: 5,
      pageIndex: 1,
      choose: null
    };
  },

  methods: {
    // 获取页面数据函数
    getList() {
      this.$axios({
        methods: "GET",
        url:
          `http://127.0.0.1:8899/admin/goods/getlist?pageIndex=${this.pageIndex}&pageSize=${this.pageSize}&searchvalue=${this.input}`
      }).then(res => {
        this.tableData = res.data.message;
        this.total = res.data.totalcount;
      });
    },
    // 删除页面数据函数
    delGood(id) {
        this.$axios({
            methods: "GET",
            url:`http://127.0.0.1:8899/admin/goods/del/${id}`
        }).then(res=>{
            const{message,status} = res.data;
            if(status === 0) {
                this.$message.success(message);
            }else {
                this.$message.error(message);
            }
        })
    },
    // 编辑
    handleEdit(index, row) {
    //   console.log(index, row);
    },

    // 逐项单个删除
    handleDelete(index, row) {
      this.delGood(row.id);
      this.getList();
    },
    // 左上角单个或多个删除
    handleDels(){
        this.delGood(this.choose);
        this.getList();
    },
    // 选择项
    handleSelectionChange(val) {
        let arr = val.map(v=>{
            return v.id
        })
        let arrIdStr = arr.join(',');
        // console.log(arrIdStr);
        this.choose = arrIdStr;
    },
    // 分页处理
    handleSizeChange(val) {
      this.pageSize = val;
    //   console.log(`每页 ${val} 条`);
      this.getList();
    },
    handleCurrentChange(val) {
      this.pageIndex = val;
    //   console.log(`当前页: ${val}`);
      this.getList();
    },
    // 处理筛选搜索
    handleSearch(){
        this.getList();
    }
  },
  mounted() {
    this.getList();
  }
};
</script>

<style>
.el-select .el-input {
  width: 130px;
}
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.goodslist {
  line-height: 1;
}
.tools {
    margin: 20px 0;
}
</style>