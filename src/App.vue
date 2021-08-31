<template>
  <router-view />
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
body {
  margin: 0;
}

.fl {
  display: flex;
}

.fl-c {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fl-b {
  display: flex;
  align-items: center;
  justify-content: space-between;
}
</style>
