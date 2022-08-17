<template>
  <el-dialog
    :title="isUpdate ? '修改文章' : '新增文章'"
    :visible="visible"
    width="50%"
    @close="btncancel"
  >
    <el-form :model="form" ref="form" :rules="rules" label-width="90px">
      <el-form-item label="文章标题:" prop="title">
        <el-input v-model="form.title" placeholder="请输入文章标签"></el-input>
      </el-form-item>
      <el-form-item label="文章内容:" prop="articleBody">
        <quill-editor
          @blur="$refs.form.validateField('articleBody')"
          v-model="form.articleBody"
        />
      </el-form-item>
      <el-form-item label="视频地址:">
        <el-input
          v-model="form.videoURL"
          placeholder="请输入视频地址"
        ></el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="btncancel">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import { update, add } from "@/api/hmmm/articles"; //修改  -- 添加
export default {
  props: {
    visible: {
      type: Boolean
    },
    data: Object
  },
  data() {
    return {
      form: {
        title: "",
        articleBody: "",
        videoURL: ""
      },
      isUpdate: false,
      rules: {
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],
        articleBody: [
          { required: true, message: "请输入文章内容", trigger: "blur" }
        ]
      }
    };
  },
  watch: {
    data() {
      if (this.data) {
        this.form = this.data;
        this.isUpdate = true;
      } else {
        this.form = {};
        this.isUpdate = false;
      }
    }
  },
  methods: {
    
    btncancel() {
      this.form= {
        title: "",
        articleBody: "",
        videoURL: ""
      }
      
      this.$refs.form.resetFields();
      this.$emit("update:visible", false);
      this.$parent.getList();
    },
    save() {
      // 修改 --  添加
      if (this.isUpdate) {
        this.$refs.form.validate(async valid => {
          if (!valid) return;
          await update(this.form);
          this.$message.success("修改成功");
          this.btncancel();
          this.$parent.getList();
        });
      } else {
        this.$refs.form.validate(async valid => {
          if (!valid) return;
          await add(this.form);
          this.$message.success("添加成功");
          this.btncancel();
          this.$parent.getList();
        });
      }
    }
  }
};
</script>

<style scoped>
::v-deep .ql-editor {
  min-height: 180px !important;
}
</style>
