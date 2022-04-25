<template>
  <el-container>
    <el-main>
      <el-row>
          <el-col :span="4" style="height: 600px">
              <div class="aside-bar-logo">
                <i class="iconfont icon-zixishi"> Ibooking</i>
              </div>
                 <el-menu
                  default-active="2"
                  class="el-menu-vertical-demo"
                  style="background-color:gray!important; height: 90%; font-weight: 700"
                  >
                  <el-menu-item index="2">
                    <i class="el-icon-location"></i>
                      <span>首页</span>
                  </el-menu-item>
                  <el-submenu index="1">
                    <template slot="title">
                      <i class="el-icon-tickets "></i>
                    <span slot="title">管理</span>
                    </template>
                    <el-menu-item index="1-1">新增自习室</el-menu-item>
                    <el-menu-item index="1-2">修改自习室</el-menu-item>
                    <el-menu-item index="1-2">删除自习室</el-menu-item>
                  
                  </el-submenu>
                  
                </el-menu>
              <!-- <div class="aside-bar">
                 <div class="aside-menu-item">
                   <i class="el-icon-menu">首页</i>
                 </div>
                 <div class="aside-menu-item">
                   <i class="el-icon-tickets">自习室管理</i>
                 </div>
              </div> -->
          </el-col>
          <el-col :span="20" style="background-color: blue;height: 600px">
              <el-menu
                :default-active="activeIndex2"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                style="display: flex; justify-content: flex-end; height: 40px;"
                active-text-color="#ffd04b">
                <el-menu-item index="1" style="height: 40px; line-height: 40px">
                  <i class="iconfont icon-sousuo"></i>
                </el-menu-item>
                <el-menu-item index="2" style="height: 40px; line-height: 40px;">
                  <div class="display: flex">
                    <el-avatar shape="square" :size="30" :fit="fill" :src="src"></el-avatar>
                      <span style="margin-left: 5px;">Talyer</span>
                       <i class="el-icon-arrow-down"></i>
                       <i class="el-icon-arrow-up" v-show="false"></i>
                  </div>
                </el-menu-item>
                <!-- <el-menu-item index="3" style="height: 40px; line-height: 40px; margin-right:10px">
                    <i class="el-icon-arrow-down"></i>
                  </el-menu-item> -->
              </el-menu>
              <el-row :gutter="24" style="padding-left: 10px">
                <el-col v-for="o in 6" :key="o" :xs="8" :sm="6" :md="5" :lg="5" style="margin-top:10px">
                  <el-card class="box-card" :body-style="{ padding: '0px' }">
                    <div slot="header" class="clearfix card-header">
                    <!-- <span>卡片名称</span> -->
                      <span style="font-size: 15px; font-weight: 600; line-height: 20px">自习室{{o}}</span>
                    </div>
                    <el-image
                      :src="src"
                      fit="fill"></el-image>
                   <div style="padding: 0px; margin-top: 10px;">
                      <!-- <span style="font-size: 15px; font-weight: 500; line-height: 20px">自习室{{o}}</span> -->
                      <div class="card-footer">
                        <div>座位数量:<strong>10</strong>,
                        开放时间:<strong>10</strong>,
                        剩余座位:<strong>10</strong>
                        ...
                        </div>
                        <div class="card-bottom">
                            <!-- <span> 2021/4/24</span> -->
                            <i class="iconfont icon-xiugai card-icon" 
                            style="background-color: #409eff;border-color: #409eff; color: white;"></i>
                            <i class="iconfont icon-shanchu card-icon"
                             style="background-color: #f56c6c;border-color: #f56c6c; color: white;"></i>
                          </div>
                          
                        </div>
                      <!-- <div class="bottom clearfix">
                        <el-button type="text" class="button">操作按钮</el-button>
                      </div> -->
                   </div>
                  </el-card>
                </el-col>
              </el-row>
          </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'index',
  data () {
    return {
      src: 'https://cube.elemecdn.com/6/94/4d3ea53c084bad6931a56d5158a48jpeg.jpeg'
    }
  },
  methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.el-header {
  padding: 0 20px;
  height: 42px !important;
}
.el-main {
  padding: 0 20px;
}
.el-card >>> .el-card__header{
  padding: 8px, 10px !important;
}
.card-header {
  margin:-18px -20px;
  padding:10px 20px; 
  background: rgb(212, 208, 208);
}
.card-footer {
  font-size: 13px;
  line-height:12px; 
  font-weight: 300; 
  color: #999;
  display: flex;
  flex-wrap: wrap;
}
.card-bottom {
  margin-top: 5px;
  display: flex;
  justify-content: end;
  /* padding: 10px; */
  background-color: rgb(212, 208, 208);
  width: 100%;
  height: 20px;
  padding: 3px;
}
.card-bottom span {
   line-height: 20px;
   margin-right: 12px;
   color: black;
   font-size: 12px;
}
.card-icon {
   line-height: 20px;
   margin-right: 10px;
   border-radius: 50%;
   height: 20px;
   width: 20px;
  }
.aside-bar-logo {
  height: 40px;
  background-color: black;
  line-height: 40px;
  color: aliceblue;
}
.aside-bar {
  margin-top: 5px;
}
.aside-menu-item {
  padding: 5px;
  font-size: 16px;

}
</style>
