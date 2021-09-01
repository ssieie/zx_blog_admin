<template>
  <div class="welcome fl-c">Welcome</div>
</template>

<script>
export default {
  name: "Welcome"
};
</script>

<style scoped lang="scss">
.welcome {
  height: 100%;
  font-size: 50px;
  font-weight: bolder;
  background: linear-gradient(to right, red, blue);
  -webkit-background-clip: text;
  color: transparent;
  opacity: .5;
  animation: welcomeAn 5s infinite linear;
}

@keyframes welcomeAn {
  to {
    -webkit-filter: hue-rotate(0deg); /* Chrome, Safari, Opera */
    filter: hue-rotate(0deg);
  }
  from {
    -webkit-filter: hue-rotate(360deg); /* Chrome, Safari, Opera */
    filter: hue-rotate(360deg);
  }
}
</style>
