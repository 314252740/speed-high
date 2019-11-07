<template>
  <div class="app_wapper">
    <el-container>
      <el-aside>
        <el-menu  mode="vertical" style="border-right:none;" unique-opened :default-active="$route.path" background-color="#304156" text-color="#fff" active-text-color="#409EFF">
          <!-- 菜单组件 -->
          <div style="line-height: 50px;height: 50px;color:#fff;font-size:18px;text-align:left;background-color: #2F4156;border: 1px solid #001528"><i class="fa fa-road fa-2x" aria-hidden="true"></i>ITMS</div>
          <side-menus :routes="getRoutes"></side-menus>
        </el-menu>
      </el-aside>
      <el-container>
        <div class="navbar">
          <hamburger id="hamburger-container" :is-active="sidebar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
          <breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
          <div class="right-menu">
            <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
              <div class="avatar-wrapper">
                <i class="fa fa-compass"></i>
              </div>
              <el-dropdown-menu slot="dropdown">
                <router-link to="/main">
                  <el-dropdown-item>
                    <i class="fa fa-home" aria-hidden="true"></i>首页
                  </el-dropdown-item>
                </router-link>
                <el-dropdown-item divided>
                  <router-link to="/map">
                    <span style="display:block;"><i style="margin-right:5px;font-size:12px;" class="iconfont icon-diqiu"></i>地图</span>
                  </router-link>
                </el-dropdown-item>

                <el-dropdown-item divided>
                  <span style="display:block;" @click="logout"><i class="fa fa-sign-out"></i>退出</span>
                </el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </div>
        <el-main>
          <!-- 二级路由跳转 -->
          <router-view style="margin-top:5px;"/>
        </el-main>
        <!-- 底部 -->
        <el-footer style="background-color: #22262e; line-height: 50px;height: 50px;">
          <div class="page-footer" style="margin-left: 210px">西安纳兴电子科技有限公司</div>
        </el-footer>
      </el-container>
    </el-container>
  </div>
</template>

<script>
// 左侧菜单组件
import sideMenus from './SideMenus'
import { mapGetters } from 'vuex'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'

export default {
  computed: {
    getRoutes () {
      return global.antRouter
    },
    ...mapGetters([
      'sidebar'
    ])

  },
  components: {
    sideMenus,
    Breadcrumb,
    Hamburger
  },
  data () {
    return {
      userRole: 'Topest'
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    async logout () {
      await this.$store.dispatch('Logout')
      this.$router.push(`/?redirect=${this.$route.fullPath}`)
      location.reload()
    }
    // map(){
    //   this.$router.push("/map")
    // }
  },
  created () {
    this.$store.dispatch('GetRoadInfos')
  },
  mounted () {
    // console.log("菜单的展开跟路由有关系，查看elementui--el-menu  的default-active 属性")
    // console.log(this.$route.path)
  }
}
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  $sideBarWidth: 220px;
  /*wapper*/
  .app_wapper {
    position: relative;
    height: 100%;
    width: 100%;
  }
  .app_content {
    min-height: 500px;
    margin-left: 220px;
    border: 1px solid #eee;
    box-sizing: border-box;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 50px;
    height: 50px;
  }

  .app_wapper .el-aside,
  .slider_container .el-menu {
    color: #333;
    transition: width .28s;
    width: $sideBarWidth !important;
    height: 100%;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 1001;
    background-color: rgb(48, 65, 86);
  }

  .el-main {
    display: block;
    -webkit-box-flex: 1;
    -ms-flex: 1;
    flex: 1;
    -ms-flex-preferred-size: auto;
    flex-basis: auto;
    overflow: auto;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    padding: 1px 10px 0 10px;
    color: #333;
    border: 1px solid #C2C2C2;
    background: #fafafa;
    border-left: 0;
    margin-left: $sideBarWidth;
    height:calc(100vh - 100px);
  }
  .el-menu-item-group__title {
    padding: 0 0 1px 20px;
    line-height: normal;
    font-size: 12px;
    color: #909399;
  }

  .el-submenu .el-menu-item {
    height: 40px;
    line-height: 40px;
    padding: 0 35px;
    min-width: 200px;
  }
  .page-footer {
    margin: auto 10px;
    display: block;
    color: #ffffff;
    bottom: 0;
    font-size: 12px;
  }
  .navbar {
    height: 50px;
    overflow: hidden;
    position: relative;
    background: #fff;
    box-shadow: 0 1px 4px rgba(0,21,41,.08);
    margin-left: $sideBarWidth;
    .hamburger-container {
      line-height: 46px;
      height: 100%;
      float: left;
      cursor: pointer;
      transition: background .3s;
      -webkit-tap-highlight-color:transparent;
      &:hover {
        background: rgba(0, 0, 0, .025)
      }
    }

    .breadcrumb-container {
      float: left;
    }

    .errLog-container {
      display: inline-block;
      vertical-align: top;
    }

    .right-menu {
      float: right;
      height: 100%;
      line-height: 50px;

      &:focus {
        outline: none;
      }

      .right-menu-item {
        display: inline-block;
        padding: 0 8px;
        height: 100%;
        font-size: 18px;
        color: #5a5e66;
        vertical-align: text-bottom;

        &.hover-effect {
          cursor: pointer;
          transition: background .3s;

          &:hover {
            background: rgba(0, 0, 0, .025)
          }
        }
      }

      .avatar-container {
        margin-right: 30px;

        .avatar-wrapper {
          margin-top: 5px;
          position: relative;

          .user-avatar {
            cursor: pointer;
            width: 40px;
            height: 40px;
            border-radius: 10px;
          }

          .el-icon-caret-bottom {
            cursor: pointer;
            position: absolute;
            right: -20px;
            top: 25px;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
