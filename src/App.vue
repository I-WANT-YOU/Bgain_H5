<template>
  <div id="app">
    <!--<router-view />-->
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive">
      </router-view>
    </keep-alive>

    <router-view v-if="!$route.meta.keepAlive">
    </router-view>
  </div>
</template>
<script>
/* eslint-disable no-underscore-dangle */

export default {
  name: 'App',
  mounted() {
    // 底部下载app组件显示
    sessionStorage.setItem('downApp', true);
    // 友盟统计添加
    const script = document.createElement('script');
    // script.src = 'https://s4.cnzz.com/z_stat.php?id=1277984698&web_id=1277984698'; // 生产
    script.src = 'https://s4.cnzz.com/z_stat.php?id=1277986709&web_id=1277986709'; // 测试
    script.language = 'JavaScript';
    document.body.appendChild(script);
  },
  watch: {
    $route() {
      if (window._czc) {
        const { location } = window;
        const contentUrl = location.pathname + location.hash;
        const refererUrl = '/';
        window._czc.push(['_trackPageview', contentUrl, refererUrl]);
      }
    },
  },
};
</script>
