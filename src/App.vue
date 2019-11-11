<template>
  <div id="app">
    <keep-alive :include="keepAlives" :max="30">
      <router-view class="page-view" />
    </keep-alive>
  </div>
</template>

<script>
export default {
  name: 'app',

  components: {
  },
  data() {
    return {
      keepAlives: [],
    }
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  methods: {

  },
}
</script>

<style lang="stylus">
@import '~@/style/base';
@import '~@/style/icon';

// body {
//   width: 100vw;
//   overflow-x: hidden;
//   font-size: 16px;
//   color: #666;
//   background-color: #f8f8f8;
// }

// #app {
//   display: flex;
//   flex-direction: column;
// }
</style>
