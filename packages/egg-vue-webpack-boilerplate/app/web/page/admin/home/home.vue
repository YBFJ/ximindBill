<template>
  <AdminLayout :title="title">
    <!-- <transition name="fade" mode="out-in">
      <router-view />
    </transition> -->
    <div class="main-bill">
      <!-- <div class="search">
        <el-row class="clear">
          <label> 标题:</label
          ><el-input
            v-model="q.title"
            class="search-input"
            clearable
            placeholder="关键字"
          />
          <label> 分类:</label
          ><el-select v-model="q.categoryId" placeholder="分类">
            <el-option
              v-for="item in categories"
              :key="item.id"
              :label="item.name"
              :value="item.categoryId"
            />
          </el-select>
          <label> 状态:</label
          ><el-select v-model="q.status" placeholder="状态">
            <el-option
              v-for="item in status"
              :key="item.id"
              :label="item.name"
              :value="item.status"
            />
          </el-select>
          <el-button class="search-button" type="primary" @click="query()"
            >查询</el-button
          >
          <el-button class="add-button" type="success" @click="write()"
            >写文章</el-button
          >
        </el-row>
      </div> -->
      <el-card>
        <el-table
          element-loading-text="拼命加载中"
          v-loading="loading"
          border
          style="width: 100%;"
          :data="billList"
          stripe
        >
          <el-table-column label="账单类型" width="100">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{
                scope.row.type === "1" ? "收入" : "支出"
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="category" label="账单分类" width="200">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{
                foramtCate(scope.row.category)
              }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="amount" label="账单金额"> </el-table-column>
          <el-table-column label="创建时间" width="180">
            <template slot-scope="scope">
              <i class="el-icon-time"></i>
              <span style="margin-left: 10px">{{
                foramtTime(scope.row.time)
              }}</span>
            </template>
          </el-table-column>
        </el-table>
      </el-card>
    </div>
  </AdminLayout>
</template>
<script type="text/babel">
import "element-ui/lib/theme-chalk/index.css"
import Vue from "vue"
import ElementUI from "element-ui"
import VueI18n from "vue-i18n"
import createI18n from "framework/i18n/admin"
import store from "./store/app"
import router from "./router"
import AdminLayout from "component/layout/admin"
import axios from "axios"
import dayjs from "dayjs"

Vue.use(VueI18n)
Vue.use(ElementUI)
const origin = ""
export default {
  router,
  store,
  components: {
    AdminLayout,
  },
  data() {
    return {
      // 请求的参数
      q: {},
      //请求时的loading效果
      loading: false,
      billList: [],
      billCateList: [],
    }
  },
  computed: {
    title() {
      return "xmind账单"
    },
    status() {
      return [
        { status: undefined, name: "--请选择--" },
        { status: 1, name: "已发布" },
        { status: 2, name: "草稿" },
      ]
    },
    categories() {
      return [
        { categoryId: 0, name: "--请选择--" },
        { categoryId: 1, name: "Nodejs" },
        { categoryId: 2, name: "Webpack" },
        { categoryId: 3, name: "Egg" },
      ]
    },
    total() {
      return this.$store.state.articleTotal
    },
    articleList() {
      return this.$store.state.articleList
    },
  },
  methods: {
    foramtTime(time) {
      console.error(time)
      return dayjs(Number(time)).format("YYYY MM-DD")
    },
    foramtCate(cate) {
      const tar = this.billCateList.find((item) => item.value === cate)
      return tar.label
    },
    query() {
      this.loading = true

      axios
        .get(`${origin}/api/getBillList`)
        .then((res) => {
          this.billList = res.data.data.billList
          this.billCateList = res.data.data.cateArr
          this.loading = false
        })
        .catch((error) => {
          console.log("获取账单失败", error)
        })
    },
    write() {
      this.$router.push("/article/add")
    },
  },

  mounted() {
    this.query()
  },
}
</script>

<style scoped>
.main-bill {
  width: 100%;
}
</style>
