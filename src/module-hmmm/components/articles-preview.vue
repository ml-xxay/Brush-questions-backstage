<template>
  <el-dialog title="预览文章" :visible="dialogVisible" width="60%" @close="btncancel">
    <div>
      <div class="title">{{ list.title }}</div>
      <div class="flex">
        <div>{{ list.createTime | dataFormat }}</div>
        <div>{{ name }}</div>
        <div>
          <span><i class="el-icon-view"></i></span>{{ list.visits }}
        </div>
      </div>
    </div>
    <div v-html="list.articleBody"></div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="btncancel">取 消</el-button>
      <el-button type="primary" @click="btncancel">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { detail } from "@/api/hmmm/articles";
import { mapGetters } from "vuex";
export default {
  props: {
    dialogVisible: {
      type: Boolean
    }
  },
  computed: {
    ...mapGetters(["name"])
  },
  created() {},

  data() {
    return {
      list: {}
    };
  },
  methods: {
    async getWenZhangInfo(row) {
      const { data } = await detail(row);
      this.list = data;
    },
    btncancel() {
      this.$emit('update:dialogVisible',false)
    }
  }
};
</script>

<style scoped>
.title {
  font-size: 20px;
  margin-bottom: 5px;
  font-weight: 700;
}
.flex {
  display: flex;
  justify-content: flex-start;
}
.flex div {
  padding: 0 5px;
}
</style>
