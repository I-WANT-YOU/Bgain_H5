<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    // 友盟统计添加
    const script = document.createElement('script');
    script.src = 'https://s4.cnzz.com/z_stat.php?id=1277984698&web_id=1277984698';
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
