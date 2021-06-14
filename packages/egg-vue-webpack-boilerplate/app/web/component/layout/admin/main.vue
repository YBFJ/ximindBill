<template>
  <div class="main">
    <div slot="content"><slot name="main" /></div>
  </div>
</template>
<style>
.main {
  display: flex;
}

.main .main-bill {
  width: 100%;
  background-color: #ecf0f5;
}
.main .app-body {
  width: 100%;
  margin-left: 230px;
  -webkit-transition: margin-left 0.35s;
  transition: margin-left 0.35s;
}
.main .main-container {
  margin-top: 50px;
  padding: 10px;
  min-height: calc(100vh - 100px);
}
</style>
<script type="babel">
import LayoutHeader from './header/header';
import LayoutContent from './content/content';
export default {
  components: {
    LayoutHeader,
    LayoutContent
  }
};
</script>
