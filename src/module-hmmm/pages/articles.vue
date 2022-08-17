<template>
  <div class="container">
    <el-card>
      <div class="flex">
        <div>
          <el-form
            :inline="true"
            :model="formInline"
            ref="formInline"
            class="demo-form-inline"
          >
            <el-form-item label="关键字">
              <el-input v-model="formInline.keyword"></el-input>
            </el-form-item>
            <el-form-item label="状态">
              <el-select v-model="formInline.state" placeholder="请选择状态">
                <el-option label="已启用" value="1"></el-option>
                <el-option label="已禁用" value="0"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item>
              <el-button @click="rest">清除</el-button>
              <el-button type="primary" @click="onSubmit">搜索</el-button>
            </el-form-item>
          </el-form>
        </div>
        <div>
          <el-button
            type="success"
            icon="el-icon-edit"
            @click="oppenPopup(null)"
            >新增技巧</el-button
          >
        </div>
      </div>
      <!-- 通栏 -->
      <el-alert
        v-if="alertText !== ''"
        :title="alertText"
        type="info"
        class="alert"
        :closable="false"
        show-icon
      ></el-alert>
      <!-- 表格 -->
      <el-table class="m" :data="list" border style="width: 100%">
        <el-table-column type="index" width="50" label="序号"></el-table-column>
        <el-table-column class="b" prop="title" label="文章标题" width="400">
          <template slot-scope="item">
            <div>{{ item.row.title }}</div>
            <span v-if="item.row.videoURL" @click="bofangship(item.row)"
              ><i class="el-icon-film tu"></i
            ></span>
          </template>
        </el-table-column>
        <el-table-column prop="visits" label="阅读数" width="180">
        </el-table-column>
        <el-table-column prop="username" width="180" label="录入人">
        </el-table-column>
        <el-table-column prop="createTime" label="录入时间">
          <template slot-scope="scope">
            {{ scope.row.createTime | dataFormat }}
          </template>
        </el-table-column>
        <!-- 状态 -->
        <el-table-column prop="state" label="状态" width="100">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.state == '0'" type="info">已禁用</el-tag>
            <el-tag type="success" v-else>已启用</el-tag>
          </template>
        </el-table-column>
        <!-- 操作 -->
        <el-table-column prop="address" label="操作" width="300">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="yulan(scope.row)"
              >预览</el-button
            >
            <el-button
              v-if="scope.row.state == '0'"
              size="mini"
              type="info"
              @click="state(scope.row)"
              >禁用</el-button
            >
            <el-button v-else size="mini" round @click="state(scope.row)"
              >启用</el-button
            >
            <el-button size="mini" type="warning" @click="oppenPopup(scope.row)"
              >修改</el-button
            >
            <el-button size="mini" type="danger" @click="remove(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
      <!--尾部页数-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="requestParameters.page"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="requestParameters.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="total"
      >
      </el-pagination>
    </el-card>
    <!-- 预览文章详情 -->
    <ArticlesPreview :dialogVisible.sync="show" :row="row" ref="yyyy" />
    <!-- 修改,添加文章 -->
    <ArticlesAdd :data="current" :visible.sync="showEdit" />
    <!-- 播放视频弹窗 -->
    <div class="box" :class="{ active: active }">
      <div class="x" @click="kkk"><i class="el-icon-error"></i></div>
      <video
        ref="video"
        id="au"
        class="aaa"
        src="https://v-cdn.zjol.com.cn/277003.mp4"
        controls="controls"
        autoplay
      ></video>
    </div>
  </div>
</template>

<script>
import { list, remove, changeState } from "@/api/hmmm/articles"; //获取面试文章列表
import ArticlesPreview from "../components/articles-preview.vue"; // 预览文章详情组件
import ArticlesAdd from "../components/articles-add.vue"; // 预览文章详情组件
export default {
  components: { ArticlesPreview, ArticlesAdd },
  data() {
    return {
      list: [], //文章数据列表
      //文章数据参数
      requestParameters: {
        page: 0,
        pagesize: 10
        // username: this.username
      },
      // 搜索表单
      formInline: {
        keyword: "",
        state: ""
      },
      alertText: "",
      show: false, //控制预览文章详情弹层显示与隐藏
      row: null,
      current: null,
      showEdit: false,
      sp: false,
      src: "",
      active: false,
      total: null
    };
  },
  created() {
    this.getList();
  },
  methods: {
    async getList() {
      const { data } = await list(this.requestParameters);
      console.log(data);
      this.list = data.items;
      this.alertText = `数据共 ${data.counts} 条记录`;
      this.total = data.counts;
    },
    // 搜索
    async onSubmit() {
      console.log("submit!");
      const { data } = await list(this.formInline);
      this.list = data.items;
      this.alertText = `数据共 ${data.counts} 条记录`;
    },
    // 播放视频
    bofangship(row) {
      console.log(row);
      this.active = true;
      // this.src = row.videoURL;
      //  let au = this.$refs.video
    // au.play();
    },
    yulan(row) {
      console.log(row);
      this.row = row;
      this.show = true;
      this.$refs.yyyy.getWenZhangInfo(row);
    },
    oppenPopup(row) {
      this.current = row;
      this.showEdit = true;
    },
    rest() {
      // 搜索表单
      this.formInline = {
        user: "",
        region: ""
      };
      this.getList();
    },
    async remove(row) {
      try {
        console.log(row);
        console.log(this.list);
        await this.$confirm("您确定删除吗?");
        if (this.list.length == 1) {
          await remove(row);
          this.requestParameters.page--;
          await this.getList();
        }
        await remove(row);
        await this.getList();

        this.$message.success("删除员工成功");
      } catch (error) {}
    },
    async state(row) {
      if (row.state == 1) {
        row.state = 0;
        await changeState(row);
        this.getList();
      } else if (row.state == 0) {
        row.state = 1;
        await changeState(row);
        this.getList();
      }
      console.log(row);
    },
    kkk() {
      this.active = false;
    },
    //监听pagesize改变的事件  条/页
    handleSizeChange(pagesize) {
      console.log(pagesize);
      this.requestParameters.pagesize = pagesize; //点击几条每页的时候  把最新的数据给queryInfo.pagesize  这样才能同步   再从新执行网络请求
      this.getList();
    },
    //监听当前页
    handleCurrentChange(pagenum) {
      console.log(pagenum);
      this.requestParameters.page = pagenum;
      this.getList();
    }
  },
  mounted() {
    // let au = this.$refs.video
    // au.play();
  }
};
</script>

<style scoped>
.flex {
  display: flex;
  justify-content: space-between;
}
.m {
  margin-top: 10px;
}
.b {
  position: relative;
  z-index: 2;
}
.tu {
  font-size: 20px;
  position: absolute;
  right: 20px;
  top: 35%;
  color: pink;
}
.box {
  display: none;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 70%;

  background-color: pink;
}
.x {
  position: absolute;
  top: -150px;
  left: 45%;
  width: 100px;
  height: 100px;
}
.x .el-icon-error {
  font-size: 100px;
  width: 100%;
  height: 100%;
}
.active {
  display: block;
}
.aaa {
  width: 100%;
  height: 400px;
}
.el-pagination {
  margin-top: 10px;
}
</style>
